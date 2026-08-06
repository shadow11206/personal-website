---
title: "VQA 评测数据自动生成器"
type: "WEB APP"
date: "2026-08-04"
description: "浏览器里点几下，基于大模型从视频批量生成 VQA 评测数据集（问题 + 参考答案 + 难度）"
cover: "/images/projects/project3.png"
techStack: ["FastAPI/Python", "React + Ant Design", "Qwen-VL / 多平台大模型"]
sourceUrl: "https://github.com/shadow11206/VQA-Auto-Generator"
---

## 项目背景

一个面向视频问答（VQA）评测数据生产的 Web 工具：告别手工 Excel、终端敲命令、结果难复核的旧流程，基于 VLM 大模型从视频自动生成「问题 + 参考答案 + 难度」，全流程在浏览器中完成。

- **全部操作在浏览器** — 配置类目、勾选视频、启动生成、审核结果
- **生成过程实时可见** — 进度条 + 滚动日志 + 断点续跑，长任务随时停止、随时续跑
- **边播视频边审核** — 结果与视频对照，在线修改 prompt / 答案，一键导出 Excel

## 五大页面

1. **工作台** — 准备 → 生成 → 校验三步流水线一键执行，实时进度与日志一目了然；生成中断后可一键「继续生成」从断点续跑，换新视频时自动切换到「生成新任务」，不会误覆盖旧结果
2. **类目配置** — 类目 / 数量 / 难度权重在线编辑，内置类目提示；支持 Excel 导入（追加 / 覆盖预览），告别手改 xlsx
3. **视频管理** — 拖拽上传视频、在线播放预览、勾选参与评测；按已使用 / 未使用 / 已导出 / 未导出筛选，删除有引用警告
4. **结果审核** — 多维筛选、边播视频边审核，在线改 prompt / 答案、批量标记重跑 / 删除，导出 Excel 所见即所得
5. **设置** — DashScope / OpenAI / OpenRouter / 智谱 / 自定义兼容接口一键切换，各自独立保存 Key 与模型，支持连通性测试

## 核心能力

| 能力 | 说明 |
|---|---|
| 断点续跑 | 按「任务 + 视频 + 类目」指纹跳过已完成条目，中断后一键继续，绝不重复消耗 |
| 数据零覆盖 | 换视频 / 改配置后新任务自动追加，历史结果永远保留（data_id 与视频绑定） |
| 多平台模型 | DashScope 原生视频理解；OpenAI 兼容平台自动「抽帧 + 图片」调用 |
| 生成可停止 | 长任务随时停止，已生成结果即时落盘 |
| 类目 Excel 导入 | 追加 / 覆盖两种模式，导入前预览 |
| 结果导出 | 审核结果一键导出 Excel，含已导出 / 未导出状态追踪 |
| 在线编辑 | 审核页直接改 prompt / 答案 / 难度，标记重跑 |

## 技术实现

- 后端：Python FastAPI（server/），API 路由 + 静态托管前端，后台任务执行器支持进度 / 断点续跑 / 停止
- 前端：React + Ant Design（web/），构建产物随仓库内置，克隆后无需 npm 即可运行
- 模型适配层：多平台 API 统一调用（vl_adapter.py），DashScope 原生视频理解，OpenAI 兼容平台自动抽帧转图片
- 数据层：xlsx / json 持久化，Web 与 CLI 共用同一份数据文件，可混用

## 数据流

`category_config.xlsx + video_list.xlsx → tasks.json →（调大模型生成）→ results.json → validate 校验 → final.json / final.csv`

## 配置与安全

- API Key 仅存本地 `server/settings.json`（已 gitignore，不会进仓库）
- 接口返回一律掩码（`sk-****4fe6`），代码中无明文密钥
- 生成 / 校验不修改原 CLI 文件，Web 与命令行可混用同一份数据
