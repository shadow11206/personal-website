import { getArticles, getArticleBySlug } from "@/lib/content";
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
        {/* Back button */}
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
