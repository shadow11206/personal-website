import { getProjects } from "@/lib/content";
import SectionTitle from "./SectionTitle";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  const projects = getProjects();

  return (
    <section
      id="projects"
      className="min-h-screen w-full bg-[#fafafa] py-20"
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
