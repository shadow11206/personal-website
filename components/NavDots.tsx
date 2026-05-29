"use client";

import { useEffect, useState } from "react";

const sections = ["about", "articles", "photos", "projects"];

export default function NavDots() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActive(i);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {sections.map((id, i) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            i === active
              ? "bg-[#ff6700] scale-125"
              : "bg-[#d0d0d0] hover:bg-[#aaa]"
          }`}
          aria-label={id}
        />
      ))}
    </div>
  );
}
