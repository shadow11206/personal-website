import Link from "next/link";
import { ProjectMeta } from "@/lib/content";

interface ProjectCardProps {
  project: ProjectMeta;
  imageLeft: boolean;
}

export default function ProjectCard({ project, imageLeft }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <div
        className="card flex flex-col sm:flex-row"
        style={{ minHeight: 200 }}
      >
        {/* Image */}
        <div
          className="w-full sm:w-[340px] h-[180px] sm:h-auto flex-shrink-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.cover})` }}
        />
        {/* Text */}
        <div className="flex flex-col justify-center p-6 sm:p-7 flex-1">
          <span className="text-[12px] tracking-[1px] text-[#ff6700] mb-1.5">
            {project.type}
          </span>
          <h3 className="text-[24px] font-bold text-text-primary">
            {project.title}
          </h3>
          <p className="text-[14px] text-text-secondary mt-1.5 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] text-text-secondary bg-[#f5f5f5] px-2.5 py-0.5 rounded
                           transition-colors duration-300 group-hover:bg-[#fff5ee]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
