"use client";

import type { ProjectMeta } from "@/lib/content";
import SectionTitle from "./SectionTitle";
import ProjectCard from "./ProjectCard";
import { useInView } from "@/hooks/useInView";

export default function ProjectsSection({ projects }: { projects: ProjectMeta[] }) {
  const { ref, inView } = useInView(0.1);

  const itemStyle = (i: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(80px)",
    transition: `all 1.1s cubic-bezier(0.25, 0.8, 0.5, 1) ${0.1 + i * 0.12}s`,
  });

  return (
    <section
      id="projects"
      ref={ref}
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

        <div className="flex flex-col gap-5">
          {projects.map((project, i) => (
            <div key={project.slug} style={itemStyle(i)}>
              <ProjectCard
                project={project}
                imageLeft={i % 2 === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
