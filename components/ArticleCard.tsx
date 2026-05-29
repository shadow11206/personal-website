import Link from "next/link";
import { ArticleMeta } from "@/lib/content";

export default function ArticleCard({ article, featured = false }: { article: ArticleMeta; featured?: boolean }) {
  if (featured) {
    return (
      <Link href={`/articles/${article.slug}`} className="block">
        <div className="card flex" style={{ height: 260 }}>
          <div
            className="w-[420px] flex-shrink-0 bg-cover bg-center transition-brightness duration-300
                        group-hover:brightness-110"
            style={{ backgroundImage: `url(${article.cover})` }}
          />
          <div className="flex flex-col justify-center p-10">
            <span className="text-[12px] tracking-[2px] text-[#ff6700] mb-2">FEATURED</span>
            <h3 className="text-[28px] font-bold text-text-primary leading-tight">{article.title}</h3>
            <p className="text-[14px] text-text-caption mt-3 line-clamp-2">{article.excerpt}</p>
            <span className="text-[11px] text-[#bbb] mt-4">{article.date} · {article.category} · {article.readTime} min read</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/articles/${article.slug}`} className="block">
      <div className="card">
        <div
          className="h-[150px] bg-cover bg-center"
          style={{ backgroundImage: `url(${article.cover})` }}
        />
        <div className="p-5">
          <h3 className="text-[16px] font-semibold text-text-primary">{article.title}</h3>
          <span className="text-[11px] text-[#bbb] mt-2 block">{article.date} · {article.readTime} min read</span>
        </div>
      </div>
    </Link>
  );
}
