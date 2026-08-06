---
title: "Batch Video Crawler"
type: "WEB APP"
date: "2026-07-08"
description: "大模型多模态评测集批量视频下载工具：输入关键词 → 预览视频列表 → 勾选下载，支持 YouTube / X / B站 三平台"
cover: "/images/projects/project4.png"
techStack: ["Python 3.11+", "yt-dlp", "Streamlit", "Playwright", "SQLite"]
sourceUrl: "https://github.com/shadow11206/Batch-Video-Crawler"
---

## 项目背景

一个面向大模型多模态评测集构建的批量视频下载工具。评测集需要成百上千个分类视频素材，手工一个个找、一个个下根本不可行。这个工具把流程收敛成三步：**输入关键词 → 预览结果 → 勾选下载**，并且支持 YouTube / X (Twitter) / B站 三个主流平台。

- **先看再下** — 先搜索预览视频列表，勾选想要的再下载，不是一键盲下
- **批量管理** — 全选 / 反选 / 仅未下载，同一关键词可反复追加搜索，自动去重
- **断点续传** — 中断后重启自动跳过已完成视频，已下载过的视频在结果中标记 ⬇️

## 三平台策略

| 平台 | 搜索方案 | 下载注意 | 成功率 |
|------|----------|----------|:--:|
| YouTube | `ytsearchN:` 关键词 flat 提取，快速 | `bestvideo[height<=720]+bestaudio` 合并 | 90%+ |
| B站 | `bilisearchN:` 完整提取（flat 模式拿不到标题） | `best`，**必须设置** Referer header | 80%+ |
| X | Playwright + EditThisCookie 导出 cookie + 反检测 | `best`，**禁止设置** 自定义 headers | 50%+（GIF/嵌入视频无法下载） |

## 核心能力

| 能力 | 说明 |
|---|---|
| 搜索预览 | 先搜索看结果，勾选再下载；同一关键词可反复追加搜索，自动去重 |
| 时长过滤前置 | 过滤在收集阶段完成（多搜 3 倍补偿），不会出现"搜 5 个只下 1 个" |
| 并发调度 | ThreadPoolExecutor 并发下载，可暂停 / 继续 / 取消，失败指数退避重试（最多 3 次） |
| 断点续传 | 任务状态持久化到 SQLite，中断后重启自动跳过已完成视频 |
| 跨任务去重 | URL 唯一约束 + 已下载标记 ⬇️，避免重复下载 |
| 可配置参数 | 画质（360p ~ 最高）、时长范围、搜索数量、并发数、存储路径 |
| 网页界面 | Streamlit 侧边栏 + 搜索 / 任务面板双 Tab，活跃任务自动刷新进度 |

## 技术实现

- 下载引擎：yt-dlp 统一封装（`downloader.py`），YouTube / B站搜索直接用内置 `ytsearch` / `bilisearch` 语法，零 API key
- X 搜索：Playwright Chromium + EditThisCookie 导出的 JSON cookie + 反 webdriver 检测，绕开 X 的反自动化拦截
- 调度器：`scheduler.py` 用 ThreadPoolExecutor 控制并发，threading.Event 信号量实现启停
- 持久化：SQLite WAL 模式（`db.py`），URL 级去重 + 任务恢复

```
src/
├── app.py          # Streamlit UI（搜索 + 任务面板双 Tab）
├── downloader.py   # yt-dlp 封装（搜索 / 下载 / 元信息）
├── db.py           # SQLite 持久化 + 去重 + 断点恢复
├── scheduler.py    # 并发调度 + 启停 + 重试
└── x_search.py     # X Playwright 搜索
```

## 核心踩坑

- **X 搜索历经 5 次方案失败** — twikit 直连 api.x.com 超时 → Playwright 沙箱被检测拦截 → 原生 Chrome CDP 调试端口不响应 → 最终 Playwright + 反检测 + cookie 才成功
- **X 下载 403** — 自定义 `http_headers` 里带了空 Referer，X CDN 直接拒绝；修复后 X/YouTube 一律不设自定义 headers，只有 B站需要
- **B站标题全是 `?`** — flat 模式提取不到完整元信息，必须完整提取才能拿到标题
- **"搜 5 个只下 1-2 个"** — 时长过滤放在下载阶段导致大量视频被 yt-dlp 跳过；改为收集阶段提前过滤，并多搜 3 倍结果补偿

## 快速开始

```bash
git clone https://github.com/shadow11206/Batch-Video-Crawler.git
cd Batch-Video-Crawler
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
playwright install chromium
streamlit run src/app.py   # 打开 http://localhost:8501
```

YouTube 和 B站开箱即用；X 平台需要 Chrome/Edge 安装 EditThisCookie 扩展，登录 x.com 后导出 cookie 存为 `x_cookies.txt` 放到项目根目录。

## 存储估算

- 720p 视频约 5-10 MB/分钟
- 100 个 × 10 分钟 ≈ 5-10 GB；200 个 × 10 分钟 ≈ 10-20 GB
- 下载文件命名：`{关键词}_{视频标题}_{视频ID}.mp4`
