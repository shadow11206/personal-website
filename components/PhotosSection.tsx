"use client";

import { useState } from "react";
import type { PhotoMeta } from "@/lib/content";
import SectionTitle from "./SectionTitle";
import PhotoCard from "./PhotoCard";

interface PhotosSectionProps {
  photos: PhotoMeta[];
  categories: string[];
}

export default function PhotosSection({ photos, categories }: PhotosSectionProps) {
  const [activeCategory, setActiveCategory] = useState("全部");

  const filtered =
    activeCategory === "全部"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

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

        {/* Responsive grid — all photos, natural aspect ratios */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {filtered.map((photo) => (
            <PhotoCard key={photo.slug} photo={photo} />
          ))}
        </div>
      </div>
    </section>
  );
}
