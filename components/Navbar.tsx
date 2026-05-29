"use client";

import { useEffect, useState } from "react";

const navItems = [
  { id: "about", label: "关于" },
  { id: "articles", label: "文章" },
  { id: "photos", label: "摄影" },
  { id: "projects", label: "项目" },
];

export default function Navbar() {
  const [active, setActive] = useState("about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActive(navItems[i].id);
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4
                  transition-all duration-300 ${
                    scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
                  }`}
    >
      <span className="font-bold text-[16px] text-text-primary">YOUR NAME</span>
      <div className="flex gap-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`text-[11px] transition-colors duration-200 ${
              active === item.id ? "text-[#ff6700]" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
