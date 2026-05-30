"use client";

import Link from "next/link";
import { PhotoMeta } from "@/lib/content";
import { useState } from "react";

export default function PhotoCard({ photo }: { photo: PhotoMeta }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      href={`/photos/${photo.slug}`}
      className="photo-card block break-inside-avoid"
    >
      <div className="relative overflow-hidden rounded-[10px] bg-[#f0f0f0]">
        <img
          src={photo.image}
          alt={photo.title}
          className={`w-full h-auto block transition-all duration-500 ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          onLoad={() => setLoaded(true)}
        />
        <div className="photo-overlay rounded-[10px]">
          <span className="text-white text-[13px] font-medium">{photo.title}</span>
        </div>
      </div>
    </Link>
  );
}
