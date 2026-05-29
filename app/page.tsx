import { getPhotos, getPhotoCategories } from "@/lib/content";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import Navbar from "@/components/Navbar";
import NavDots from "@/components/NavDots";
import AboutSection from "@/components/AboutSection";
import ArticlesSection from "@/components/ArticlesSection";
import PhotosSection from "@/components/PhotosSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  const photos = getPhotos();
  const categories = getPhotoCategories();

  return (
    <SmoothScrollWrapper>
      <Navbar />
      <NavDots />
      <AboutSection />
      <ArticlesSection />
      <PhotosSection photos={photos} categories={categories} />
      <ProjectsSection />
    </SmoothScrollWrapper>
  );
}
