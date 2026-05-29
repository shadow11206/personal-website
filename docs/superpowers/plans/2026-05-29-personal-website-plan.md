# 个人网站实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个综合型个人网站，包含关于我、文章、摄影、项目四个全屏滚动模块，小米风格设计，Markdown 内容驱动，GSAP 动效。

**Architecture:** Next.js App Router + 单页全屏滚动 + 静态生成。主页面通过 GSAP ScrollTrigger 监听滚动切换模块，每个模块是独立的全屏 section 组件。内容通过 Markdown 文件和 JSON 配置文件管理，构建时加载。详情页通过 App Router 动态路由生成。

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS 4, GSAP (ScrollTrigger), Lenis, react-markdown, gray-matter

---

## 文件结构

```
/
├── app/
│   ├── layout.tsx              # Root layout: Lenis provider, global styles
│   ├── page.tsx                # Main page: full-screen scroll container
│   ├── globals.css             # Tailwind + CSS variables + animations
│   ├── articles/[slug]/page.tsx
│   ├── photos/[slug]/page.tsx
│   └── projects/[slug]/page.tsx
├── components/
│   ├── Navbar.tsx              # Fixed top nav, scroll-aware background
│   ├── NavDots.tsx             # Right-side section indicator dots
│   ├── AboutSection.tsx        # Plan C: left image + right text
│   ├── ArticlesSection.tsx     # Hero card + 3-column grid
│   ├── PhotosSection.tsx       # Category tabs + masonry gallery
│   ├── ProjectsSection.tsx     # Alternating L/R cards
│   ├── ArticleCard.tsx         # Card with hover float + shadow
│   ├── PhotoCard.tsx           # Card with hover scale + overlay
│   ├── ProjectCard.tsx         # Card with hover float + tag color
│   ├── ContactIcon.tsx         # SVG icon circle, orange hover
│   ├── SectionTitle.tsx        # Reusable label + big title
│   └── BackButton.tsx          # ← back with hover orange + slide
├── lib/
│   └── content.ts              # Read markdown files, parse frontmatter
├── data/
│   └── profile.json            # Name, bio, photo, social links
├── content/
│   ├── articles/               # *.md with frontmatter
│   ├── photos/                 # *.md with frontmatter
│   └── projects/               # *.md with frontmatter
└── public/images/              # Static assets (头像, 摄影, 截图等)
```

---

### Task 1: 项目脚手架搭建

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`

- [ ] **Step 1: 创建 Next.js 项目**

```bash
cd "/Users/shadow/Desktop/xiangmu/Personal Website"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm --no-turbopack
```

- [ ] **Step 2: 安装依赖**

```bash
npm install gsap lenis gray-matter react-markdown @lenis/react
npm install -D @types/node
```

- [ ] **Step 3: 配置 tailwind.config.ts 添加设计令牌**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        xiaomi: {
          orange: "#ff6700",
          "orange-light": "rgba(255,103,0,0.15)",
        },
        text: {
          primary: "#1a1a1a",
          body: "#666666",
          secondary: "#888888",
          caption: "#999999",
        },
        surface: {
          light: "#fafafa",
          border: "#e8e8e8",
          divider: "#f0f0f0",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "float-up": "floatUp 0.3s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        floatUp: {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-4px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: 初始化 git，提交**

```bash
git add -A && git commit -m "feat: scaffold Next.js project with Tailwind and dependencies

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 2: 全局样式与设计令牌

**Files:**
- Create: `app/globals.css`

- [ ] **Step 1: 编写 globals.css — CSS 变量 + 基础样式 + 动画**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-orange: #ff6700;
  --color-orange-light: rgba(255, 103, 0, 0.15);
  --color-text-primary: #1a1a1a;
  --color-text-body: #666666;
  --color-text-secondary: #888888;
  --color-text-caption: #999999;
  --color-surface-light: #fafafa;
  --color-border: #e8e8e8;
  --color-divider: #f0f0f0;
  --ease-out: cubic-bezier(0.25, 0.8, 0.5, 1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: auto;
}

body {
  font-family: "Inter", system-ui, -apple-system, sans-serif;
  color: var(--color-text-primary);
  background: #ffffff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Smooth scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #d0d0d0;
  border-radius: 3px;
}

/* Contact icon hover */
.contact-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  cursor: pointer;
  transition: all 0.25s var(--ease-out);
}
.contact-icon svg {
  stroke: #888;
  transition: stroke 0.25s var(--ease-out);
}
.contact-icon:hover {
  border-color: var(--color-orange);
  transform: translateY(-2px);
  box-shadow: 0 2px 8px var(--color-orange-light);
}
.contact-icon:hover svg {
  stroke: var(--color-orange);
}

/* Card base */
.card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: all 0.3s var(--ease-out);
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* Photo card */
.photo-card {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.35s var(--ease-out);
}
.photo-card:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
.photo-card .photo-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
  padding: 16px 12px 8px;
  opacity: 0;
  transition: opacity 0.35s var(--ease-out);
}
.photo-card:hover .photo-overlay {
  opacity: 1;
}
```

- [ ] **Step 2: 提交**

```bash
git add app/globals.css && git commit -m "feat: add global styles with design tokens and card animations

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 3: 内容数据层

**Files:**
- Create: `data/profile.json`
- Create: `content/articles/sample-1.md`
- Create: `content/photos/sample-1.md`
- Create: `content/projects/sample-1.md`
- Create: `lib/content.ts`

- [ ] **Step 1: 创建 profile.json**

```json
{
  "name": "你的名字",
  "title": "摄影师 / 写作者 / 创意技术爱好者",
  "bio": "相信好的作品来自持续的观察与思考。热爱在山川湖海间寻找灵感，用镜头和文字记录这个世界。",
  "avatar": "/images/avatar.jpg",
  "email": "hello@example.com",
  "social": {
    "blog": "https://blog.example.com",
    "github": "https://github.com/yourname",
    "twitter": "https://x.com/yourname"
  },
  "stats": {
    "articles": 12,
    "photos": 200,
    "projects": 8
  }
}
```

- [ ] **Step 2: 创建示例 Markdown 内容文件 — 文章**

`content/articles/sample-1.md`:
```markdown
---
title: "设计系统的构建与思考"
date: "2024-06-15"
category: "设计"
cover: "/images/articles/design-system.jpg"
excerpt: "从零开始构建一个可扩展的设计系统，记录过程中的关键决策和实践经验。"
readTime: 8
featured: true
---

## 引言

设计系统不是一套组件库，而是一种共同语言...

## 建立色彩体系

色彩的语义化命名是设计系统中最容易被忽视但最重要的环节...
```

- [ ] **Step 3: 创建示例 Markdown 内容文件 — 摄影**

`content/photos/sample-1.md`:
```markdown
---
title: "山川之间"
date: "2024-03-20"
category: "风景"
image: "/images/photos/mountains.jpg"
location: "四川 · 稻城亚丁"
---
```

- [ ] **Step 4: 创建示例 Markdown 内容文件 — 项目**

`content/projects/sample-1.md`:
```markdown
---
title: "项目名称 A"
type: "WEB APP"
date: "2024-04-10"
description: "一个帮助设计师管理色彩系统的工具，支持色彩提取、色板生成和团队协作。"
cover: "/images/projects/project-a.jpg"
techStack: ["React", "TypeScript", "Node.js"]
liveUrl: "https://example.com"
sourceUrl: "https://github.com/yourname/project-a"
---

## 项目背景

在做设计项目的过程中，我发现现有的色彩管理工具要么过于简单、要么学习成本太高...

## 技术实现

前端使用 React + TypeScript 构建 UI，后端使用 Node.js 处理色彩算法...
```

- [ ] **Step 5: 创建 lib/content.ts — 内容加载工具**

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  cover: string;
  excerpt: string;
  readTime: number;
  featured: boolean;
}

export interface PhotoMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  location: string;
}

export interface ProjectMeta {
  slug: string;
  title: string;
  type: string;
  date: string;
  description: string;
  cover: string;
  techStack: string[];
  liveUrl?: string;
  sourceUrl?: string;
}

export function getArticles(): ArticleMeta[] {
  const dir = path.join(CONTENT_ROOT, "articles");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      return { slug: file.replace(".md", ""), ...data } as ArticleMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): { meta: ArticleMeta; content: string } {
  const filePath = path.join(CONTENT_ROOT, "articles", `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { meta: { slug, ...data } as ArticleMeta, content };
}

export function getPhotos(): PhotoMeta[] {
  const dir = path.join(CONTENT_ROOT, "photos");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      return { slug: file.replace(".md", ""), ...data } as PhotoMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPhotoBySlug(slug: string): PhotoMeta {
  const filePath = path.join(CONTENT_ROOT, "photos", `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  return { slug, ...data } as PhotoMeta;
}

export function getProjects(): ProjectMeta[] {
  const dir = path.join(CONTENT_ROOT, "projects");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      return { slug: file.replace(".md", ""), ...data } as ProjectMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getProjectBySlug(slug: string): { meta: ProjectMeta; content: string } {
  const filePath = path.join(CONTENT_ROOT, "projects", `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { meta: { slug, ...data } as ProjectMeta, content };
}

export function getPhotoCategories(): string[] {
  const photos = getPhotos();
  return ["全部", ...Array.from(new Set(photos.map((p) => p.category)))];
}
```

- [ ] **Step 6: 提交**

```bash
git add data/ content/ lib/ && git commit -m "feat: add content data layer with markdown support

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 4: 通用 UI 组件（SectionTitle, ContactIcon, BackButton）

**Files:**
- Create: `components/SectionTitle.tsx`
- Create: `components/ContactIcon.tsx`
- Create: `components/BackButton.tsx`

- [ ] **Step 1: 编写 SectionTitle 组件**

```typescript
interface SectionTitleProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ label, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-8">
      <div className="text-[10px] tracking-[3px] text-text-caption uppercase mb-2">
        {label}
      </div>
      <h2 className="text-[36px] font-bold text-text-primary tracking-[-0.5px] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[13px] text-text-secondary mt-2">{subtitle}</p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: 编写 ContactIcon 组件 — 含邮箱/文章/GitHub/X 四种图标 SVG**

```typescript
type IconType = "email" | "blog" | "github" | "twitter";

interface ContactIconProps {
  type: IconType;
  href: string;
}

const iconPaths: Record<IconType, string> = {
  email:
    "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 4L12 13 2 4",
  blog:
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  github:
    "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
  twitter:
    "M4 4l7.5 10L4 20h1.5l6-7 5 7H22l-8-10.5L21 4h-1.5l-5.5 6.5L9 4H4z",
};

const iconSizes: Record<IconType, number> = {
  email: 18,
  blog: 18,
  github: 18,
  twitter: 16,
};

export default function ContactIcon({ type, href }: ContactIconProps) {
  const size = iconSizes[type];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="contact-icon"
      aria-label={type}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={iconPaths[type]} />
      </svg>
    </a>
  );
}
```

- [ ] **Step 3: 编写 BackButton 组件 — hover 变橙 + 箭头左移**

```typescript
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-[11px] text-text-secondary
                 hover:text-[#ff6700] transition-colors duration-250 group"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="group-hover:-translate-x-1 transition-transform duration-250"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      {label}
    </Link>
  );
}
```

- [ ] **Step 4: 提交**

```bash
git add components/SectionTitle.tsx components/ContactIcon.tsx components/BackButton.tsx && git commit -m "feat: add reusable UI components with hover animations

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 5: 卡片组件（ArticleCard, PhotoCard, ProjectCard）

**Files:**
- Create: `components/ArticleCard.tsx`
- Create: `components/PhotoCard.tsx`
- Create: `components/ProjectCard.tsx`

- [ ] **Step 1: 编写 ArticleCard — hover 上移 4px + 阴影 + 封面变亮**

```typescript
import Link from "next/link";
import { ArticleMeta } from "@/lib/content";

export default function ArticleCard({ article, featured = false }: { article: ArticleMeta; featured?: boolean }) {
  if (featured) {
    return (
      <Link href={`/articles/${article.slug}`} className="block">
        <div className="card flex" style={{ height: 220 }}>
          <div
            className="w-[360px] flex-shrink-0 bg-cover bg-center transition-brightness duration-300
                        group-hover:brightness-110"
            style={{ backgroundImage: `url(${article.cover})` }}
          />
          <div className="flex flex-col justify-center p-8">
            <span className="text-[10px] tracking-[1px] text-[#ff6700] mb-2">FEATURED</span>
            <h3 className="text-[22px] font-bold text-text-primary leading-tight">{article.title}</h3>
            <p className="text-[12px] text-text-caption mt-2 line-clamp-2">{article.excerpt}</p>
            <span className="text-[10px] text-[#bbb] mt-3">{article.date} · {article.category} · {article.readTime} min read</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/articles/${article.slug}`} className="block">
      <div className="card">
        <div
          className="h-[120px] bg-cover bg-center"
          style={{ backgroundImage: `url(${article.cover})` }}
        />
        <div className="p-4">
          <h3 className="text-[14px] font-semibold text-text-primary">{article.title}</h3>
          <span className="text-[10px] text-[#bbb] mt-1.5 block">{article.date} · {article.readTime} min read</span>
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: 编写 PhotoCard — hover 微放大 + 渐变标题浮出**

```typescript
import Link from "next/link";
import { PhotoMeta } from "@/lib/content";

export default function PhotoCard({ photo, large = false }: { photo: PhotoMeta; large?: boolean }) {
  return (
    <Link
      href={`/photos/${photo.slug}`}
      className={`photo-card block ${large ? "row-span-2" : ""}`}
    >
      <div
        className="w-full h-full min-h-[160px] bg-cover bg-center"
        style={{ backgroundImage: `url(${photo.image})` }}
      />
      <div className="photo-overlay">
        <span className="text-white text-[10px] font-medium">{photo.title}</span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 3: 编写 ProjectCard — hover 上移 4px + 标签背景变深**

```typescript
import Link from "next/link";
import { ProjectMeta } from "@/lib/content";

interface ProjectCardProps {
  project: ProjectMeta;
  imageLeft: boolean;
}

export default function ProjectCard({ project, imageLeft }: ProjectCardProps) {
  const imageBlock = (
    <div
      className="w-[340px] h-[200px] flex-shrink-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${project.cover})` }}
    />
  );

  const textBlock = (
    <div className="flex flex-col justify-center p-7 flex-1">
      <span className="text-[10px] tracking-[1px] text-[#ff6700] mb-1.5">{project.type}</span>
      <h3 className="text-[20px] font-bold text-text-primary">{project.title}</h3>
      <p className="text-[12px] text-text-secondary mt-1.5 leading-relaxed">{project.description}</p>
      <div className="flex gap-1.5 mt-3">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-[9px] text-text-secondary bg-[#f5f5f5] px-2.5 py-0.5 rounded
                       transition-colors duration-300 group-hover:bg-[#fff5ee]"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <div className="card flex">
        {imageLeft ? imageBlock : textBlock}
        {imageLeft ? textBlock : imageBlock}
      </div>
    </Link>
  );
}
```

- [ ] **Step 4: 提交**

```bash
git add components/ArticleCard.tsx components/PhotoCard.tsx components/ProjectCard.tsx && git commit -m "feat: add card components with differentiated hover effects

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 6: AboutSection — 方案 C 布局

**Files:**
- Create: `components/AboutSection.tsx`

- [ ] **Step 1: 编写 AboutSection**

```typescript
import profile from "@/data/profile.json";
import ContactIcon from "./ContactIcon";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="h-screen w-full flex bg-white overflow-hidden"
      data-section="about"
    >
      {/* Left: full-bleed image — 45% */}
      <div
        className="w-[45%] h-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${profile.avatar})` }}
      >
        {/* Orange decorative dot */}
        <div className="absolute bottom-6 right-6 w-9 h-9 bg-[#ff6700] rounded-full flex items-center justify-center">
          <span className="text-white text-[13px]">✦</span>
        </div>
      </div>

      {/* Right: text content — 55% */}
      <div className="flex-1 flex items-center px-14">
        <div>
          {/* Label */}
          <div className="text-[10px] tracking-[3px] text-text-caption uppercase mb-3">
            ABOUT ME
          </div>

          {/* Name */}
          <h1 className="text-[36px] font-bold text-text-primary tracking-[-0.5px] leading-tight">
            {profile.name}
          </h1>

          {/* Orange divider */}
          <div className="w-10 h-[3px] bg-[#ff6700] my-4" />

          {/* Bio */}
          <p className="text-[14px] text-text-body leading-relaxed max-w-[400px]">
            {profile.title}
            <br />
            {profile.bio}
          </p>

          {/* Contact icons */}
          <div className="flex gap-3 mt-5">
            <ContactIcon type="email" href={`mailto:${profile.email}`} />
            <ContactIcon type="blog" href={profile.social.blog} />
            <ContactIcon type="github" href={profile.social.github} />
            <ContactIcon type="twitter" href={profile.social.twitter} />
          </div>

          {/* Stats row */}
          <div className="flex gap-10 mt-7 pt-5 border-t border-surface-divider">
            <div>
              <span className="font-bold text-text-primary text-[18px]">{profile.stats.articles}+</span>
              <span className="text-[10px] text-text-caption ml-1.5">文章</span>
            </div>
            <div>
              <span className="font-bold text-text-primary text-[18px]">{profile.stats.photos}+</span>
              <span className="text-[10px] text-text-caption ml-1.5">摄影</span>
            </div>
            <div>
              <span className="font-bold text-text-primary text-[18px]">{profile.stats.projects}</span>
              <span className="text-[10px] text-text-caption ml-1.5">项目</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add components/AboutSection.tsx && git commit -m "feat: add About section with plan C magazine editorial layout

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 7: ArticlesSection 和 PhotosSection

**Files:**
- Create: `components/ArticlesSection.tsx`
- Create: `components/PhotosSection.tsx`

- [ ] **Step 1: 编写 ArticlesSection**

```typescript
import { getArticles } from "@/lib/content";
import SectionTitle from "./SectionTitle";
import ArticleCard from "./ArticleCard";

export default function ArticlesSection() {
  const articles = getArticles();
  const featured = articles.find((a) => a.featured);
  const list = articles.filter((a) => !a.featured).slice(0, 3);

  return (
    <section
      id="articles"
      className="h-screen w-full bg-[#fafafa] flex items-center overflow-hidden"
      data-section="articles"
    >
      <div className="max-w-[1100px] mx-auto px-10 py-12 w-full">
        <SectionTitle
          label="ARTICLES"
          title="文章 & 思考"
          subtitle="记录思考，分享发现。写过的文字，走过的路。"
        />

        {/* Featured hero card */}
        {featured && (
          <div className="mb-6">
            <ArticleCard article={featured} featured />
          </div>
        )}

        {/* 3-column grid */}
        <div className="grid grid-cols-3 gap-4">
          {list.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 编写 PhotosSection — 含分类标签栏 + 瀑布流画廊**

```typescript
"use client";

import { useState } from "react";
import { getPhotos, getPhotoCategories } from "@/lib/content";
import SectionTitle from "./SectionTitle";
import PhotoCard from "./PhotoCard";

export default function PhotosSection() {
  const photos = getPhotos();
  const categories = getPhotoCategories();
  const [activeCategory, setActiveCategory] = useState("全部");

  const filtered =
    activeCategory === "全部"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const mainPhoto = filtered[0];
  const sidePhotos = filtered.slice(1, 5);

  return (
    <section
      id="photos"
      className="h-screen w-full bg-white flex items-center overflow-hidden"
      data-section="photos"
    >
      <div className="max-w-[1100px] mx-auto px-10 py-12 w-full">
        <SectionTitle
          label="GALLERY"
          title="摄影作品"
          subtitle="用镜头捕捉光影，记录世界的每一个瞬间。"
        />

        {/* Category tabs */}
        <div className="flex gap-6 mb-7 border-b border-surface-divider pb-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[12px] pb-3 -mb-[13px] transition-colors duration-200 border-b-2
                ${cat === activeCategory
                  ? "text-[#ff6700] border-[#ff6700] font-medium"
                  : "text-text-caption border-transparent hover:text-text-secondary"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-[2fr_1fr_1fr] grid-rows-[180px_180px] gap-3">
          {mainPhoto && (
            <div className="row-span-2">
              <PhotoCard photo={mainPhoto} large />
            </div>
          )}
          {sidePhotos.map((photo) => (
            <PhotoCard key={photo.slug} photo={photo} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: 提交**

```bash
git add components/ArticlesSection.tsx components/PhotosSection.tsx && git commit -m "feat: add articles and photos sections with filtering and masonry grid

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 8: ProjectsSection

**Files:**
- Create: `components/ProjectsSection.tsx`

- [ ] **Step 1: 编写 ProjectsSection**

```typescript
import { getProjects } from "@/lib/content";
import SectionTitle from "./SectionTitle";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  const projects = getProjects();

  return (
    <section
      id="projects"
      className="h-screen w-full bg-[#fafafa] flex items-center overflow-hidden"
      data-section="projects"
    >
      <div className="max-w-[1100px] mx-auto px-10 py-12 w-full">
        <SectionTitle
          label="PROJECTS"
          title="个人项目"
          subtitle="把想法变成现实，每一个项目都是一次探索。"
        />

        <div className="flex flex-col gap-5">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              imageLeft={i % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add components/ProjectsSection.tsx && git commit -m "feat: add projects section with alternating card layout

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 9: Navbar 和 NavDots

**Files:**
- Create: `components/Navbar.tsx`
- Create: `components/NavDots.tsx`

- [ ] **Step 1: 编写 Navbar — 固定顶部，scroll 时加背景，当前 section 高亮**

```typescript
"use client";

import { useEffect, useState } from "react";

const navItems = [
  { id: "about", label: "关于" },
  { id: "articles", label: "文章" },
  { id: "photos", label: "摄影" },
  { id: "projects", label: "项目" },
];

export default function Navbar() {
  const [active, setActive] = useState("about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActive(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4
                  transition-all duration-300 ${
                    scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
                  }`}
    >
      <span className="font-bold text-[14px] text-text-primary">YOUR NAME</span>
      <div className="flex gap-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`text-[11px] transition-colors duration-200 ${
              active === item.id ? "text-[#ff6700]" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: 编写 NavDots — 右侧固定圆点导航**

```typescript
"use client";

import { useEffect, useState } from "react";

const sections = ["about", "articles", "photos", "projects"];

export default function NavDots() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActive(i);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {sections.map((id, i) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            i === active
              ? "bg-[#ff6700] scale-125"
              : "bg-[#d0d0d0] hover:bg-[#aaa]"
          }`}
          aria-label={id}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 3: 提交**

```bash
git add components/Navbar.tsx components/NavDots.tsx && git commit -m "feat: add navigation components with scroll-aware active state

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 10: Root Layout 与主页面组装

**Files:**
- Create: `app/layout.tsx` (modify existing)
- Create: `app/page.tsx` (modify existing)

- [ ] **Step 1: 编写 app/layout.tsx — 引入 Lenis 平滑滚动**

```typescript
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Name — Personal Website",
  description: "摄影师 / 写作者 / 创意技术爱好者",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: 编写 app/page.tsx — 组装全屏滚动主页**

```typescript
"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import NavDots from "@/components/NavDots";
import AboutSection from "@/components/AboutSection";
import ArticlesSection from "@/components/ArticlesSection";
import PhotosSection from "@/components/PhotosSection";
import ProjectsSection from "@/components/ProjectsSection";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Refresh ScrollTrigger when Lenis updates
    lenis.on("scroll", () => ScrollTrigger.update());

    return () => lenis.destroy();
  }, []);

  return (
    <div ref={containerRef}>
      <Navbar />
      <NavDots />
      <AboutSection />
      <ArticlesSection />
      <PhotosSection />
      <ProjectsSection />
    </div>
  );
}
```

- [ ] **Step 3: 提交**

```bash
git add app/layout.tsx app/page.tsx && git commit -m "feat: assemble main page with Lenis smooth scrolling and all sections

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 11: 文章详情页

**Files:**
- Create: `app/articles/[slug]/page.tsx`

- [ ] **Step 1: 编写动态路由详情页 — generateStaticParams + 页面组件**

```typescript
import { getArticles, getArticleBySlug } from "@/lib/content";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import BackButton from "@/components/BackButton";

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let data;
  try {
    data = getArticleBySlug(slug);
  } catch {
    notFound();
  }
  const { meta } = data;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[720px] mx-auto px-10 py-12">
        {/* Back */}
        <div className="mb-8">
          <BackButton href="/#articles" label="返回文章列表" />
        </div>

        {/* Header — fade up on enter */}
        <div className="animate-fade-up">
          <span className="text-[10px] tracking-[1px] text-[#ff6700]">
            {meta.category.toUpperCase()} · {meta.date}
          </span>
          <h1 className="text-[32px] font-bold text-text-primary mt-3 leading-tight">
            {meta.title}
          </h1>
          <div className="flex items-center gap-2.5 mt-4 pb-6 border-b border-surface-divider">
            <div className="w-7 h-7 bg-[#f0f0f0] rounded-full" />
            <span className="text-[11px] text-text-secondary">
              Your Name · {meta.readTime} min read
            </span>
          </div>
        </div>

        {/* Body — prose styling */}
        <div className="mt-6 prose prose-sm max-w-none
                        prose-headings:text-text-primary prose-headings:font-semibold
                        prose-p:text-[14px] prose-p:text-text-body prose-p:leading-relaxed
                        prose-img:rounded-lg prose-img:w-full
                        prose-blockquote:border-l-[3px] prose-blockquote:border-[#ff6700]
                        prose-blockquote:bg-[#fafafa] prose-blockquote:rounded-r-md
                        prose-blockquote:py-3 prose-blockquote:px-4
                        prose-blockquote:text-[12px] prose-blockquote:text-text-body
                        prose-blockquote:not-italic">
          <ReactMarkdown>{data.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add app/articles/ && git commit -m "feat: add article detail page with markdown rendering and scroll animations

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 12: 摄影详情页

**Files:**
- Create: `app/photos/[slug]/page.tsx`

- [ ] **Step 1: 编写摄影详情页 — 全宽大图 + 地点**

```typescript
import { getPhotos, getPhotoBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";

export function generateStaticParams() {
  return getPhotos().map((p) => ({ slug: p.slug }));
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let photo;
  try {
    photo = getPhotoBySlug(slug);
  } catch {
    notFound();
  }

  const allPhotos = getPhotos();
  const currentIndex = allPhotos.findIndex((p) => p.slug === slug);
  const prevPhoto = currentIndex > 0 ? allPhotos[currentIndex - 1] : null;
  const nextPhoto =
    currentIndex < allPhotos.length - 1 ? allPhotos[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1000px] mx-auto px-10 py-12">
        {/* Top bar */}
        <div className="flex items-end justify-between mb-7">
          <div>
            <span className="text-[10px] tracking-[1px] text-[#ff6700]">
              {photo.category.toUpperCase()} · {photo.date}
            </span>
            <h1 className="text-[28px] font-bold text-text-primary mt-2">
              {photo.title}
            </h1>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-text-secondary">
            {prevPhoto ? (
              <a
                href={`/photos/${prevPhoto.slug}`}
                className="flex items-center gap-1 hover:text-[#ff6700] transition-colors group"
              >
                <svg
                  width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="group-hover:-translate-x-1 transition-transform"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                上一张
              </a>
            ) : (
              <span className="text-[#ddd] flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                上一张
              </span>
            )}
            <span className="text-[#e0e0e0]">|</span>
            {nextPhoto ? (
              <a
                href={`/photos/${nextPhoto.slug}`}
                className="flex items-center gap-1 hover:text-[#ff6700] transition-colors group"
              >
                下一张
                <svg
                  width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            ) : (
              <span className="text-[#ddd] flex items-center gap-1">
                下一张
                <svg width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            )}
          </div>
        </div>

        {/* Main image */}
        <div className="animate-fade-up">
          <div
            className="w-full aspect-video bg-cover bg-center rounded-[10px]"
            style={{ backgroundImage: `url(${photo.image})` }}
          />
        </div>

        {/* Location only */}
        <div className="flex items-center gap-1.5 mt-5 pt-4 border-t border-surface-divider"
             style={{ animationDelay: "0.2s" }}>
          <svg
            width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="#bbb" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="12" cy="10" r="3"/>
            <path d="M12 2a8 8 0 0 0-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 0 0-8-8z"/>
          </svg>
          <span className="text-[12px] text-text-secondary">{photo.location}</span>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <BackButton href="/#photos" label="返回画廊" />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add app/photos/ && git commit -m "feat: add photo detail page with prev/next navigation and location info

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 13: 项目详情页

**Files:**
- Create: `app/projects/[slug]/page.tsx`

- [ ] **Step 1: 编写项目详情页**

```typescript
import { getProjects, getProjectBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import BackButton from "@/components/BackButton";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let data;
  try {
    data = getProjectBySlug(slug);
  } catch {
    notFound();
  }
  const { meta } = data;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[900px] mx-auto px-10 py-12">
        <div className="mb-8">
          <BackButton href="/#projects" label="返回项目列表" />
        </div>

        {/* Header — staggered entrance */}
        <div>
          <span className="text-[10px] tracking-[1px] text-[#ff6700] animate-fade-in">
            {meta.type}
          </span>
          <h1
            className="text-[28px] font-bold text-text-primary mt-2 animate-fade-up"
            style={{ animationDelay: "0.08s" }}
          >
            {meta.title}
          </h1>
          <p
            className="text-[13px] text-text-secondary mt-1.5 max-w-[600px] leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.16s" }}
          >
            {meta.description}
          </p>

          {/* Tech stack tags */}
          <div
            className="flex gap-1.5 mt-3.5 animate-fade-up"
            style={{ animationDelay: "0.24s" }}
          >
            {meta.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[9px] text-text-secondary bg-[#f5f5f5] px-2.5 py-0.5 rounded
                           hover:bg-[#fff5ee] transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* External links */}
          <div
            className="flex gap-3 mt-4 animate-fade-up"
            style={{ animationDelay: "0.32s" }}
          >
            {meta.liveUrl && (
              <a
                href={meta.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] text-text-primary
                           border border-surface-border rounded-full px-4 py-1.5
                           hover:border-[#ff6700] hover:text-[#ff6700]
                           hover:-translate-y-0.5 transition-all duration-250"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                在线访问
              </a>
            )}
            {meta.sourceUrl && (
              <a
                href={meta.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] text-text-primary
                           border border-surface-border rounded-full px-4 py-1.5
                           hover:border-[#ff6700] hover:text-[#ff6700]
                           hover:-translate-y-0.5 transition-all duration-250"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61
                           c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77
                           5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0
                           C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78
                           c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
                源代码
              </a>
            )}
          </div>
        </div>

        {/* Hero image */}
        <div
          className="w-full h-[260px] bg-cover bg-center rounded-[10px] mt-7
                     animate-fade-up"
          style={{
            backgroundImage: `url(${meta.cover})`,
            animationDelay: "0.4s",
          }}
        />

        {/* Body content */}
        <div className="mt-7 prose prose-sm max-w-none
                        prose-headings:text-text-primary prose-headings:font-semibold
                        prose-p:text-[13px] prose-p:text-text-body prose-p:leading-relaxed
                        prose-img:rounded-lg prose-img:w-full">
          <ReactMarkdown>{data.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add app/projects/ && git commit -m "feat: add project detail page with staggered animations and external links

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 14: 最终验证与测试

- [ ] **Step 1: 运行项目检查编译**

```bash
npm run build
```

Expected: 构建成功，无 TypeScript 错误，静态页面生成完毕。

- [ ] **Step 2: 启动开发服务器验证**

```bash
npm run dev
```

打开 `http://localhost:3000` 验证：
- 四个 section 全屏显示，鼠标滚轮切换
- 文章/摄影/项目卡片点击打开详情页
- 卡片 hover 上浮动画正常
- 联系图标 hover 橙色变色
- 导航栏 section 高亮跟随滚动
- 摄影分类标签切换正常
- 详情页返回按钮正常工作

- [ ] **Step 3: 修复发现的问题并提交**

```bash
git add -A && git commit -m "fix: final polish and bug fixes

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## 开发顺序

```
Task 1 (脚手架)
  → Task 2 (全局样式)
    → Task 3 (数据层)
      → Task 4 (通用 UI 组件)
        → Task 5 (卡片组件)
          → Task 6 (AboutSection)
          → Task 7 (Articles + Photos)
          → Task 8 (ProjectsSection)
        → Task 9 (Navbar + NavDots)
      → Task 10 (主页面组装)
    → Task 11 (文章详情)
    → Task 12 (摄影详情)
    → Task 13 (项目详情)
→ Task 14 (验证)
```

Tasks 6-9 可并行开发（互不依赖），Tasks 11-13 可并行开发。
