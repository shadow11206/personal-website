"use client";

import { useEffect, useRef } from "react";
import type { ProjectMeta } from "@/lib/content";
import SectionTitle from "./SectionTitle";
import ProjectCard from "./ProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection({ projects }: { projects: ProjectMeta[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        gsap.fromTo(".projects-list > *",
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 1.0, stagger: 0.15, ease: "power3.out",
            scrollTrigger: {
              trigger: "#projects",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }, sectionRef);
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen w-full py-20"
      style={{ background: "linear-gradient(160deg, #faf8f5 0%, #f8f0e5 50%, #f2e8d8 100%)" }}
      data-section="projects"
    >
      <div className="max-w-[1100px] mx-auto px-10 w-full">
        <SectionTitle
          label="PROJECTS"
          title="个人项目"
          subtitle="把想法变成现实，每一个项目都是一次探索。"
        />

        <div className="projects-list flex flex-col gap-5">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              imageLeft={i % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
