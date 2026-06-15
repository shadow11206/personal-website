import Link from "next/link";
import Image from "next/image";
import { PhotoMeta } from "@/lib/content";

export default function PhotoCard({ photo }: { photo: PhotoMeta }) {
  return (
    <Link
      href={`/photos/${photo.slug}`}
      className="photo-card block w-full h-full"
    >
      <Image
        src={photo.image}
        alt={photo.title}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1100px) 25vw, 260px"
        className="object-cover"
      />
      <div className="photo-overlay">
        <span className="text-white text-[13px] font-medium">{photo.title}</span>
      </div>
    </Link>
  );
}
