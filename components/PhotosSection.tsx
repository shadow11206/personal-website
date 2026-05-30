"use client";

import { useState } from "react";
import type { PhotoMeta } from "@/lib/content";
import SectionTitle from "./SectionTitle";
import PhotoCard from "./PhotoCard";

interface PhotosSectionProps {
  photos: PhotoMeta[];
  categories: string[];
}

const INITIAL_SHOW = 8;

export default function PhotosSection({ photos, categories }: PhotosSectionProps) {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [showAll, setShowAll] = useState(false);

  const filtered =
    activeCategory === "全部"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_SHOW);
  const hasMore = filtered.length > INITIAL_SHOW;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setShowAll(false);
  };

  return (
    <section
      id="photos"
      className="min-h-screen w-full bg-white py-20"
      data-section="photos"
    >
      <div className="max-w-[1100px] mx-auto px-10 w-full">
        <SectionTitle
          label="GALLERY"
          title="摄影作品"
          subtitle="用镜头捕捉光影，记录世界的每一个瞬间。"
        />

        {/* Category tabs */}
        <div className="flex gap-6 mb-8 border-b border-surface-divider pb-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`text-[12px] pb-3 -mb-[13px] transition-colors duration-200 border-b-2
                ${cat === activeCategory
                  ? "text-[#ff6700] border-[#ff6700] font-medium"
                  : "text-text-caption border-transparent hover:text-text-secondary"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Artistic masonry grid — 3 columns, auto rows, 8px gaps */}
        <div className="grid grid-cols-3 auto-rows-[180px] gap-2">
          {visible.map((photo) => (
            <PhotoCard key={photo.slug} photo={photo} />
          ))}
        </div>

        {/* Show more */}
        {hasMore && !showAll && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 text-[13px] text-text-secondary
                         border border-surface-border rounded-full px-6 py-2.5
                         hover:border-[#ff6700] hover:text-[#ff6700]
                         transition-all duration-250"
            >
              查看更多
              <span className="text-[11px] text-text-caption">
                (+{filtered.length - INITIAL_SHOW} 张)
              </span>
            </button>
          </div>
        )}

        {showAll && hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(false)}
              className="text-[12px] text-text-caption hover:text-[#ff6700] transition-colors"
            >
              收起
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
