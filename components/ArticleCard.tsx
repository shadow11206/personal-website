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
            <span className="text-[12px] tracking-[1px] text-[#ff6700] mb-2">FEATURED</span>
            <h3 className="text-[26px] font-bold text-text-primary leading-tight line-clamp-2">{article.title}</h3>
            <p className="text-[14px] text-text-caption mt-2 line-clamp-2">{article.excerpt}</p>
            <span className="text-[12px] text-[#bbb] mt-3">{article.date} · {article.category} · {article.readTime} min read</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/articles/${article.slug}`} className="block h-full">
      <div className="card h-full flex flex-col">
        <div
          className="h-[140px] flex-shrink-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${article.cover})` }}
        />
        <div className="p-4 flex-1 flex flex-col justify-between">
          <h3 className="text-[16px] font-semibold text-text-primary line-clamp-2">{article.title}</h3>
          <span className="text-[12px] text-[#bbb] mt-2 block">{article.date} · {article.readTime} min read</span>
        </div>
      </div>
    </Link>
  );
}
