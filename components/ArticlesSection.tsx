"use client";

import type { ArticleMeta } from "@/lib/content";
import SectionTitle from "./SectionTitle";
import ArticleCard from "./ArticleCard";
import { useInView } from "@/hooks/useInView";

export default function ArticlesSection({ articles }: { articles: ArticleMeta[] }) {
  const featuredArticle = articles.find((a) => a.featured);
  const { ref, inView } = useInView(0.1);

  const cardStyle = (i: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(80px)",
    transition: `all 1.1s cubic-bezier(0.25, 0.8, 0.5, 1) ${0.15 + i * 0.1}s`,
  });

  return (
    <section
      id="articles"
      ref={ref}
      className="min-h-screen w-full py-20"
      style={{ background: "linear-gradient(160deg, #f5f7fa 0%, #eef2f7 50%, #e6ecf2 100%)" }}
      data-section="articles"
    >
      <div className="max-w-[1100px] mx-auto px-10 w-full">
        <SectionTitle
          label="ARTICLES"
          title="文章 & 思考"
          subtitle="记录思考，分享发现。写过的文字，走过的路。"
        />

        {featuredArticle && (
          <div
            className="mb-8 transition-all duration-1000 ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(60px)",
              transition: "all 1.1s cubic-bezier(0.25, 0.8, 0.5, 1) 0.05s",
            }}
          >
            <ArticleCard article={featuredArticle} featured />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.filter((a) => a.slug !== featuredArticle?.slug).map((article, i) => (
            <div key={article.slug} style={cardStyle(i)}>
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
