import Link from "next/link";
import { PhotoMeta } from "@/lib/content";

export default function PhotoCard({ photo, large = false }: { photo: PhotoMeta; large?: boolean }) {
  return (
    <Link
      href={`/photos/${photo.slug}`}
      className={`photo-card block ${large ? "row-span-2" : ""}`}
    >
      <div
        className="w-full h-full min-h-[160px] bg-cover bg-center"
        style={{ backgroundImage: `url(${photo.image})` }}
      />
      <div className="photo-overlay">
        <span className="text-white text-[10px] font-medium">{photo.title}</span>
      </div>
    </Link>
  );
}
