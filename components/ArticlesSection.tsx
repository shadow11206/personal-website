"use client";

import { useEffect, useRef } from "react";
import type { ArticleMeta } from "@/lib/content";
import SectionTitle from "./SectionTitle";
import ArticleCard from "./ArticleCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ArticlesSection({ articles }: { articles: ArticleMeta[] }) {
  const featuredArticle = articles.find((a) => a.featured);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".articles-featured",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: "#articles",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(".articles-grid .card",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
          scrollTrigger: {
            trigger: ".articles-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="articles"
      ref={sectionRef}
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
          <div className="articles-featured mb-8">
            <ArticleCard article={featuredArticle} featured />
          </div>
        )}

        <div className="articles-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
