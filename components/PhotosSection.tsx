"use client";

import { useState } from "react";
import type { PhotoMeta } from "@/lib/content";
import SectionTitle from "./SectionTitle";
import PhotoCard from "./PhotoCard";
import { useInView } from "@/hooks/useInView";

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
  // Rich jigsaw: hero(3x2), large(2x2), wide(2x1), tall(1x2), small(1x1)
  return photos.map((photo, i) => {
    if (i === 0) return { ...photo, spanCols: 3, spanRows: 2 }; // hero
    const p = i % 8;
    if (p === 3 || p === 6) return { ...photo, spanCols: 2, spanRows: 2 }; // large
    if (p === 5) return { ...photo, spanCols: 2, spanRows: 1 }; // wide
    if (p === 2 || p === 7) return { ...photo, spanCols: 1, spanRows: 2 }; // tall
    return { ...photo, spanCols: 1, spanRows: 1 }; // small
  });
}

export default function PhotosSection({ photos, categories }: PhotosSectionProps) {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [showAll, setShowAll] = useState(false);
  const { ref, inView } = useInView(0.05);

  const allSized = assignGridSpans(photos);

  const filtered =
    activeCategory === "全部"
      ? allSized
      : allSized.filter((p) => p.category === activeCategory);

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_SHOW);
  const hasMore = filtered.length > INITIAL_SHOW;

  const itemStyle = (i: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "scale(1)" : "scale(0.82)",
    transition: `all 1.0s cubic-bezier(0.25, 0.8, 0.5, 1) ${0.05 + i * 0.07}s`,
  });

  return (
    <section
      id="photos"
      ref={ref}
      className="min-h-screen w-full py-20"
      style={{ background: "linear-gradient(160deg, #f5f8f5 0%, #eef5ee 50%, #e6f0e6 100%)" }}
      data-section="photos"
    >
      <div className="max-w-[1100px] mx-auto px-10 w-full">
        <SectionTitle
          label="GALLERY"
          title="摄影作品"
          subtitle="用镜头捕捉光影，记录世界的每一个瞬间。"
        />

        <div className="flex gap-6 mb-8 border-b border-surface-divider pb-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
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

        {/* 4-column grid, 220px rows */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-3 grid-flow-row-dense">
          {visible.map((photo, i) => (
            <div
              key={photo.slug}
              style={{
                ...itemStyle(i),
                gridColumn: `span ${photo.spanCols}`,
                gridRow: `span ${photo.spanRows}`,
              }}
            >
              <PhotoCard photo={photo} />
            </div>
          ))}
        </div>

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
