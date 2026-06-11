import { getProjects, getProjectBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import BackButton from "@/components/BackButton";
import ImageViewer from "@/components/ImageViewer";

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
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #faf8f5 0%, #f8f0e5 40%, #f2e8d8 100%)" }}>
      <div className="max-w-[900px] mx-auto px-10 py-12">
        <div className="mb-8">
          <BackButton href="/#projects" label="返回项目列表" />
        </div>

        {/* Header — staggered entrance */}
        <div>
          <span className="text-[12px] tracking-[1px] text-[#ff6700] animate-fade-in">
            {meta.type}
          </span>
          <h1
            className="text-[34px] font-bold text-text-primary mt-2 animate-fade-up"
            style={{ animationDelay: "0.08s" }}
          >
            {meta.title}
          </h1>
          <p
            className="text-[15px] text-text-secondary mt-1.5 max-w-[600px] leading-relaxed animate-fade-up"
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
                className="text-[11px] text-text-secondary bg-[#f5f5f5] px-2.5 py-0.5 rounded
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
                className="inline-flex items-center gap-1.5 text-[13px] text-text-primary
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
                className="inline-flex items-center gap-1.5 text-[13px] text-text-primary
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
          className="mt-7 rounded-[10px] overflow-hidden animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <ImageViewer
            src={meta.cover}
            alt={meta.title}
            className="w-full h-[260px] object-cover"
          />
        </div>

        {/* Body content */}
        <div className="mt-7 prose prose-sm max-w-none
                        prose-headings:text-text-primary prose-headings:font-semibold
                        prose-p:text-[15px] prose-p:text-text-body prose-p:leading-relaxed
                        prose-img:rounded-lg prose-img:w-full">
          <ReactMarkdown
            components={{
              img: ({ src, alt }) => {
                const srcStr = typeof src === "string" ? src : "";
                return (
                  <ImageViewer src={srcStr} alt={alt || ""} className="rounded-lg w-full" />
                );
              },
            }}
          >
            {data.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
