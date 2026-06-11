"use client";

import { useState, useCallback, useEffect } from "react";

interface ImageViewerProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageViewer({ src, alt, className = "" }: ImageViewerProps) {
  const [open, setOpen] = useState(false);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onKeyDown]);

  return (
    <>
      {/* Thumbnail — click to open */}
      <div
        className={`cursor-zoom-in group relative overflow-hidden rounded-[10px] ${className}`}
        onClick={() => setOpen(true)}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto block"
        />
        {/* Hover hint */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <span className="text-white text-[12px] tracking-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 rounded-full px-4 py-2">
            点击放大
          </span>
        </div>
      </div>

      {/* Immersive overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-xl flex items-center justify-center animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 z-[101] w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center transition-colors backdrop-blur"
            aria-label="关闭"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img
            src={src}
            alt={alt}
            className="max-w-[92vw] max-h-[92vh] object-contain select-none animate-scale-in shadow-2xl rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
