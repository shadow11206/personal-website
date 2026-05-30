"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { PhotoMeta } from "@/lib/content";

export default function PhotoCard({ photo }: { photo: PhotoMeta }) {
  const [span, setSpan] = useState("col-span-1 row-span-1");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const handleLoad = () => {
      const ratio = img.naturalWidth / img.naturalHeight;
      if (ratio > 1.5) {
        setSpan("col-span-2 row-span-1"); // wide landscape → span 2 cols
      } else if (ratio < 0.75) {
        setSpan("col-span-1 row-span-2"); // tall portrait → span 2 rows
      } else if (ratio > 1.2) {
        setSpan("col-span-2 row-span-1"); // mild landscape
      } else {
        setSpan("col-span-1 row-span-1"); // square-ish → 1×1
      }
    };
    if (img.complete) {
      handleLoad();
    } else {
      img.addEventListener("load", handleLoad);
      return () => img.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <Link
      href={`/photos/${photo.slug}`}
      className={`photo-card block ${span}`}
    >
      <div className="relative overflow-hidden rounded-[10px] bg-[#f0f0f0] h-full">
        <img
          ref={imgRef}
          src={photo.image}
          alt={photo.title}
          className="w-full h-full object-cover block"
          loading="lazy"
        />
        <div className="photo-overlay rounded-[10px]">
          <span className="text-white text-[13px] font-medium">{photo.title}</span>
        </div>
      </div>
    </Link>
  );
}
