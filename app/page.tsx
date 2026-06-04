import { getPhotos, getPhotoCategories, getArticles, getProjects } from "@/lib/content";
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
  const articles = getArticles();
  const projects = getProjects();

  return (
    <SmoothScrollWrapper>
      <Navbar />
      <NavDots />
      <AboutSection />
      <ArticlesSection articles={articles} />
      <PhotosSection photos={photos} categories={categories} />
      <ProjectsSection projects={projects} />
    </SmoothScrollWrapper>
  );
}
