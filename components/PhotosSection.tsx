"use client";

import { useState } from "react";
import { getPhotos, getPhotoCategories } from "@/lib/content";
import SectionTitle from "./SectionTitle";
import PhotoCard from "./PhotoCard";

export default function PhotosSection() {
  const photos = getPhotos();
  const categories = getPhotoCategories();
  const [activeCategory, setActiveCategory] = useState("全部");

  const filtered =
    activeCategory === "全部"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const mainPhoto = filtered[0];
  const sidePhotos = filtered.slice(1, 5);

  return (
    <section
      id="photos"
      className="h-screen w-full bg-white flex items-center overflow-hidden"
      data-section="photos"
    >
      <div className="max-w-[1100px] mx-auto px-10 py-12 w-full">
        <SectionTitle
          label="GALLERY"
          title="摄影作品"
          subtitle="用镜头捕捉光影，记录世界的每一个瞬间。"
        />

        {/* Category tabs */}
        <div className="flex gap-6 mb-7 border-b border-surface-divider pb-3">
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

        {/* Masonry grid */}
        <div className="grid grid-cols-[2fr_1fr_1fr] grid-rows-[180px_180px] gap-3">
          {mainPhoto && (
            <div className="row-span-2">
              <PhotoCard photo={mainPhoto} large />
            </div>
          )}
          {sidePhotos.map((photo) => (
            <PhotoCard key={photo.slug} photo={photo} />
          ))}
        </div>
      </div>
    </section>
  );
}
