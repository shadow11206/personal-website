import Link from "next/link";
import { ProjectMeta } from "@/lib/content";

interface ProjectCardProps {
  project: ProjectMeta;
  imageLeft: boolean;
}

export default function ProjectCard({ project, imageLeft }: ProjectCardProps) {
  const imageBlock = (
    <div
      className="w-[340px] h-[200px] flex-shrink-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${project.cover})` }}
    />
  );

  const textBlock = (
    <div className="flex flex-col justify-center p-7 flex-1">
      <span className="text-[10px] tracking-[1px] text-[#ff6700] mb-1.5">{project.type}</span>
      <h3 className="text-[20px] font-bold text-text-primary">{project.title}</h3>
      <p className="text-[12px] text-text-secondary mt-1.5 leading-relaxed">{project.description}</p>
      <div className="flex gap-1.5 mt-3">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-[9px] text-text-secondary bg-[#f5f5f5] px-2.5 py-0.5 rounded
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
