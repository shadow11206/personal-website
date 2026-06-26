# Personal Website

## 架构

- Next.js 15 App Router，单页滚动首页（`app/page.tsx`），四个 section：About / Articles / Photos / Projects
- 明细页 `app/{articles,photos,projects}/[slug]/page.tsx`，全部 `generateStaticParams` 做 SSG
- 没有列表索引页，所有导航从首页直达详情页

## 内容系统

- Markdown 内容在 `content/{articles,photos,projects}/`，`gray-matter` 解析
- TypeScript 接口（`ArticleMeta`、`PhotoMeta`、`ProjectMeta`）定义在 `lib/content.ts`
- 文章/照片/项目新增只需在对应目录加 `.md` 文件 + 图片放 `public/images/` 即可，构建时自动发现
- 个人信息（名字、简介、社交链接、统计数字）在 `data/profile.json`，由 `AboutSection.tsx` 读取

### 内容 frontmatter 字段

**文章**：title, date, category, cover, excerpt, readTime, featured
**照片**：title, date, category, image, location
**项目**：title, type, date, description, cover, techStack[], liveUrl?, sourceUrl?

## 照片模块

- 照片按文件名数字序号排序（`parseInt(slug.replace(/\D/g, ""))`），不依赖 date 字段（多数为空或无序）
- 不规则拼图网格：`assignGridSpans()` 按 index 分配 span（0=hero 3×2，之后 8 项周期：large/wide/tall/small）
- 网格 4 列 `auto-rows-[220px]`，`INITIAL_SHOW = 10`（少了右下角会缺角）
- 所有照片已压缩为 2400px 长边 WebP（`ae4f914`），新增图片也需类似处理，否则首页滚动会卡
- `PhotoCard` 用 `next/image` 的 `fill` + `object-cover`，父容器 `.photo-card` 已有 `position: relative`
- `SmoothScrollWrapper` 初始化了 Lenis + GSAP ScrollTrigger，但各 section 入场动画实际用的是自定义 `useInView`（IntersectionObserver），不是 ScrollTrigger
- 动画交错延迟：照片 0.07s×i，文章 0.1s×i，改动节奏需考虑该规律

## 滚动与导航

- Lenis 平滑滚动 duration 1.2s，自定义缓动函数
- Navbar 和 NavDots 各自独立监听 `window.scroll` 判断当前 section（通过 `offsetTop` 比较）
- Navbar 里 "YOUR NAME" 是硬编码的，没有读 `profile.json`
- BackButton 使用纯 `<Link href="/#xxx">`，不在组件内做 `router.back()`（会导致"下一张"后返回错误页面）

## 状态持久化

- `PhotosSection` 将 `activeCategory` 和 `showAll` 写入 `sessionStorage`（key: `photos-section-state`）
- 滚动位置通过 scroll 事件 debounce 保存到 `sessionStorage`（key: `photos-scroll-y`）
- 返回首页时先恢复 state → 触发渲染 → 双 `requestAnimationFrame` 延迟恢复滚动

## 部署

- 平台：Cloudflare Pages（`personal-website-6ba.pages.dev`）
- 构建：`output: "export"` 静态导出到 `out/`，`images.unoptimized: true`
- CI/CD：`.github/workflows/deploy.yml`，push main 自动部署
- Secrets：`CF_API_TOKEN` / `CF_ACCOUNT_ID` / `CF_PROJECT_NAME`
- 本地预览静态构建用 `npx serve out/`，`next start` 在此模式下不可用

## 移动端适配

- About：`flex-col md:flex-row`，头像 `w-full md:w-[45%] h-[45vh] md:h-full`
- 项目卡片：`flex-col md:flex-row`，图片 `w-full md:w-[340px]`，手机图在文上，桌面交替用 `md:order-last`
- 照片网格：`grid-cols-2 md:grid-cols-4`

## 已知注意事项

- `ImageViewer`（用于文章/项目）和 `PhotoViewer`（用于照片）代码几乎一样，改一个要记得改另一个
- `lib/content.ts` 用同步 `fs.readdirSync/readFileSync`，仅在构建时运行，不能用于运行时
- 每个 section 有不同背景渐变，在各自组件里硬编码
- 文章详情页 Markdown 渲染用 `@tailwindcss/typography` 的 `prose`，图片通过 `ReactMarkdown` 的 component override 替换为 `ImageViewer`
