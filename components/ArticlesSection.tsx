import { getArticles } from "@/lib/content";
import SectionTitle from "./SectionTitle";
import ArticleCard from "./ArticleCard";

export default function ArticlesSection() {
  const articles = getArticles();
  const featuredArticle = articles.find((a) => a.featured);

  return (
    <section
      id="articles"
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
          <div className="mb-8">
            <ArticleCard article={featuredArticle} featured />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
