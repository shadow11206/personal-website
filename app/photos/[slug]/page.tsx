import { getPhotos, getPhotoBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";

export function generateStaticParams() {
  return getPhotos().map((p) => ({ slug: p.slug }));
}

function PrevNextNav({ slug }: { slug: string }) {
  const allPhotos = getPhotos();
  const currentIndex = allPhotos.findIndex((p) => p.slug === slug);
  const prevPhoto = currentIndex > 0 ? allPhotos[currentIndex - 1] : null;
  const nextPhoto = currentIndex < allPhotos.length - 1 ? allPhotos[currentIndex + 1] : null;

  return (
    <div className="flex items-center gap-2 text-[11px] text-text-secondary">
      {prevPhoto ? (
        <a
          href={`/photos/${prevPhoto.slug}`}
          className="flex items-center gap-1 hover:text-[#ff6700] transition-colors group"
        >
          <svg
            width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="1.5"
            className="group-hover:-translate-x-1 transition-transform"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          上一张
        </a>
      ) : (
        <span className="text-[#ddd] flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          上一张
        </span>
      )}
      <span className="text-[#e0e0e0]">|</span>
      {nextPhoto ? (
        <a
          href={`/photos/${nextPhoto.slug}`}
          className="flex items-center gap-1 hover:text-[#ff6700] transition-colors group"
        >
          下一张
          <svg
            width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="1.5"
            className="group-hover:translate-x-1 transition-transform"
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      ) : (
        <span className="text-[#ddd] flex items-center gap-1">
          下一张
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </span>
      )}
    </div>
  );
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let photo;
  try {
    photo = getPhotoBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1000px] mx-auto px-10 py-12">
        {/* Top bar */}
        <div className="flex items-end justify-between mb-7">
          <div>
            <span className="text-[10px] tracking-[1px] text-[#ff6700]">
              {photo.category.toUpperCase()} · {photo.date}
            </span>
            <h1 className="text-[28px] font-bold text-text-primary mt-2">
              {photo.title}
            </h1>
          </div>
          <PrevNextNav slug={slug} />
        </div>

        {/* Main image */}
        <div className="animate-fade-up">
          <div
            className="w-full aspect-video bg-cover bg-center rounded-[10px]"
            style={{ backgroundImage: `url(${photo.image})` }}
          />
        </div>

        {/* Location only */}
        <div
          className="flex items-center gap-1.5 mt-5 pt-4 border-t border-surface-divider"
          style={{ animationDelay: "0.2s" }}
        >
          <svg
            width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="#bbb" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="12" cy="10" r="3"/>
            <path d="M12 2a8 8 0 0 0-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 0 0-8-8z"/>
          </svg>
          <span className="text-[12px] text-text-secondary">{photo.location}</span>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <BackButton href="/#photos" label="返回画廊" />
        </div>
      </div>
    </div>
  );
}
