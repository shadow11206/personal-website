---
title: "ai-observation"
type: "WEB APP"
date: "2026-03-20"
description: "帮助个人及团队了解每日AI热点、深度调研话题，构建AI认知"
cover: "/images/projects/project1.jpg"
techStack: ["纯静态HTML/CSS/JS"]
liveUrl: "https://shadow11206.github.io/ai-observation/ui/index.html"
sourceUrl: "https://github.com/shadow11206/ai-observation"
---

## 项目背景

一个基于 GitHub Pages + GitHub Actions 构建的个人 AI 行业观察系统，核心功能：

每日日报：自动抓取 30+ RSS 信源，AI 提炼摘要，每天 09:00 自动生成
追踪体系：持续跟踪 AI 领域重要人物、公司和信息源动态
深度调研：针对重点公司 / 话题 / 趋势的深度研究存档
观点日志：对 AI 行业核心问题的实时判断更新，区别于普通资料收藏

## 技术实现

自动化：GitHub Actions（定时触发，无需服务器）
AI 生成：DeepSeek / OpenAI / Anthropic（通过环境变量切换）
数据层：Python 脚本生成 JSON，存入仓库
前端：纯静态 HTML/CSS/JS，部署于 GitHub Pages
信源：30+ RSS 订阅，按优先级分级处理
