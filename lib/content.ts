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
