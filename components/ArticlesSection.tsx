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
