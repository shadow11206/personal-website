import Link from "next/link";
import { PhotoMeta } from "@/lib/content";

export default function PhotoCard({ photo }: { photo: PhotoMeta }) {
  return (
    <Link
      href={`/photos/${photo.slug}`}
      className="photo-card block"
    >
      <div className="relative overflow-hidden rounded-[10px] bg-[#f0f0f0]">
        <img
          src={photo.image}
          alt={photo.title}
          className="w-full h-auto block"
          loading="lazy"
        />
        <div className="photo-overlay rounded-[10px]">
          <span className="text-white text-[13px] font-medium">{photo.title}</span>
        </div>
      </div>
    </Link>
  );
}
