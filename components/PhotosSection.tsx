"use client";

import { useState, useEffect, useRef } from "react";
import type { PhotoMeta } from "@/lib/content";
import SectionTitle from "./SectionTitle";
import PhotoCard from "./PhotoCard";

interface PhotosSectionProps {
  photos: PhotoMeta[];
  categories: string[];
}

interface SizedPhoto extends PhotoMeta {
  spanCols: number;
  spanRows: number;
}

const INITIAL_SHOW = 9;

function assignGridSpans(photos: PhotoMeta[]): SizedPhoto[] {
  // Pattern: first photo hero (2x2), then varied: wide(2x1), tall(1x2), square(1x1)
  return photos.map((photo, i) => {
    if (i === 0) return { ...photo, spanCols: 2, spanRows: 2 };
    const pattern = i % 6;
    if (pattern === 1 || pattern === 4) return { ...photo, spanCols: 2, spanRows: 1 }; // wide
    if (pattern === 2) return { ...photo, spanCols: 1, spanRows: 2 }; // tall
    return { ...photo, spanCols: 1, spanRows: 1 }; // normal/small
  });
}

export default function PhotosSection({ photos, categories }: PhotosSectionProps) {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [showAll, setShowAll] = useState(false);

  const allSized = assignGridSpans(photos);

  const filtered =
    activeCategory === "全部"
      ? allSized
      : allSized.filter((p) => p.category === activeCategory);

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

        {/* Jigsaw grid — varying spans per photo */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] gap-3">
          {visible.map((photo) => {
            const colSpan = photo.spanCols;
            const rowSpan = photo.spanRows;
            return (
              <div
                key={photo.slug}
                className="relative"
                style={{
                  gridColumn: `span ${colSpan}`,
                  gridRow: `span ${rowSpan}`,
                }}
              >
                <PhotoCard photo={photo} />
              </div>
            );
          })}
        </div>

        {/* Show more / collapse */}
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
