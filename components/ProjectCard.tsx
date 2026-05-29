import Link from "next/link";
import { ProjectMeta } from "@/lib/content";

interface ProjectCardProps {
  project: ProjectMeta;
  imageLeft: boolean;
}

export default function ProjectCard({ project, imageLeft }: ProjectCardProps) {
  const imageBlock = (
    <div
      className="w-[400px] h-[230px] flex-shrink-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${project.cover})` }}
    />
  );

  const textBlock = (
    <div className="flex flex-col justify-center p-8 flex-1">
      <span className="text-[12px] tracking-[2px] text-[#ff6700] mb-2">{project.type}</span>
      <h3 className="text-[24px] font-bold text-text-primary">{project.title}</h3>
      <p className="text-[14px] text-text-secondary mt-2 leading-relaxed">{project.description}</p>
      <div className="flex gap-1.5 mt-4">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-[10px] text-text-secondary bg-[#f5f5f5] px-3 py-1 rounded
                       transition-colors duration-300 group-hover:bg-[#fff5ee]"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <div className="card flex">
        {imageLeft ? imageBlock : textBlock}
        {imageLeft ? textBlock : imageBlock}
      </div>
    </Link>
  );
}
