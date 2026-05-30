import Link from "next/link";
import { PhotoMeta } from "@/lib/content";

export default function PhotoCard({ photo }: { photo: PhotoMeta }) {
  return (
    <Link
      href={`/photos/${photo.slug}`}
      className="photo-card block w-full h-full"
    >
      <img
        src={photo.image}
        alt={photo.title}
        className="w-full h-full object-cover block"
        loading="lazy"
      />
      <div className="photo-overlay">
        <span className="text-white text-[13px] font-medium">{photo.title}</span>
      </div>
    </Link>
  );
}
