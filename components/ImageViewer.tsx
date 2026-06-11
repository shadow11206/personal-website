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
      <img
        src={src}
        alt={alt}
        className={`cursor-zoom-in ${className}`}
        onClick={() => setOpen(true)}
      />

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center cursor-zoom-out animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 z-[101] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="关闭"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img
            src={src}
            alt={alt}
            className="max-w-[92vw] max-h-[92vh] object-contain select-none"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
