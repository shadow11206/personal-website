import { getArticles } from "@/lib/content";
import SectionTitle from "./SectionTitle";
import ArticleCard from "./ArticleCard";

export default function ArticlesSection() {
  const articles = getArticles();
  const featured = articles.find((a) => a.featured);
  const list = articles.filter((a) => !a.featured);

  return (
    <section
      id="articles"
      className="min-h-screen w-full bg-[#fafafa] py-20"
      data-section="articles"
    >
      <div className="max-w-[1100px] mx-auto px-10 w-full">
        <SectionTitle
          label="ARTICLES"
          title="文章 & 思考"
          subtitle="记录思考，分享发现。写过的文字，走过的路。"
        />

        {featured && (
          <div className="mb-6">
            <ArticleCard article={featured} featured />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
