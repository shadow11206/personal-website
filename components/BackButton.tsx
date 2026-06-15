"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  href: string;
  label: string;
}

export default function BackButton({ href, label }: BackButtonProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (document.referrer) {
      try {
        const referrerOrigin = new URL(document.referrer).origin;
        if (referrerOrigin === window.location.origin) {
          router.back();
          return;
        }
      } catch {}
    }
    router.push(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 text-[13px] text-text-secondary
                 hover:text-[#ff6700] transition-colors duration-250 group"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="group-hover:-translate-x-1 transition-transform duration-250"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      {label}
    </a>
  );
}
