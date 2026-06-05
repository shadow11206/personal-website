# Personal Website

个人作品集网站，基于 Next.js 15 构建，展示文章、摄影作品和项目。

## 技术栈

- **框架**: Next.js 15 (App Router) + React 19 + TypeScript
- **样式**: Tailwind CSS + @tailwindcss/typography
- **动画**: GSAP + Lenis 平滑滚动
- **内容**: Markdown 文件驱动，gray-matter 解析 frontmatter

## 页面结构

| 区块 | 说明 |
|------|------|
| About | 全屏个人介绍，头像 + 社交链接 + 数据统计 |
| Articles | 文章列表，支持分类筛选，Markdown 渲染详情页 |
| Photos | 摄影作品拼图画廊，按分类筛选，支持前后导航 |
| Projects | 项目卡片展示，含技术栈标签、在线访问/源码链接 |

## 目录结构

```
app/                    # Next.js App Router 页面
  page.tsx              # 首页（单页滚动布局）
  articles/[slug]/      # 文章详情页
  photos/[slug]/        # 照片详情页（含 PhotoViewer）
  projects/[slug]/      # 项目详情页
components/             # React 组件
  AboutSection.tsx      # 关于区块（全屏）
  ArticlesSection.tsx   # 文章列表区块
  PhotosSection.tsx     # 摄影拼图区块
  ProjectsSection.tsx   # 项目列表区块
  Navbar.tsx / NavDots.tsx  # 导航栏和侧边导航点
  SmoothScrollWrapper.tsx   # Lenis 平滑滚动封装
content/                # Markdown 内容文件
  articles/             # 文章 .md
  photos/               # 照片 .md
  projects/             # 项目 .md
data/profile.json       # 个人信息配置
lib/content.ts          # 内容读取与解析
hooks/useInView.ts      # IntersectionObserver 自定义 Hook
```

## 开始使用

```bash
npm install
npm run dev     # 开发模式 → http://localhost:3000
npm run build   # 生产构建
npm run start   # 启动生产服务
```

## 内容管理

所有内容以 Markdown 文件存放在 `content/` 目录下，通过 frontmatter 定义元数据：

- **文章** — `title`, `date`, `category`, `cover`, `excerpt`, `readTime`, `featured`
- **照片** — `title`, `date`, `category`, `image`, `location`
- **项目** — `title`, `type`, `date`, `description`, `cover`, `techStack`, `liveUrl`, `sourceUrl`

个人信息（姓名、简介、社交链接、统计数字）在 `data/profile.json` 中配置。
