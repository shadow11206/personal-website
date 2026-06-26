"use client";

import profile from "@/data/profile.json";
import ContactIcon from "./ContactIcon";
import { useInView } from "@/hooks/useInView";

export default function AboutSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen md:h-screen w-full flex flex-col md:flex-row overflow-hidden"
      style={{ background: "linear-gradient(160deg, #faf8f5 0%, #f5f0e8 50%, #efe4d4 100%)" }}
      data-section="about"
    >
      <div
        className="w-full md:w-[45%] h-[45vh] md:h-full bg-cover bg-center relative transition-all duration-1000 ease-out"
        style={{
          backgroundImage: `url(${profile.avatar})`,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateX(0)" : "translateX(-60px)",
        }}
      />

      <div className="flex-1 flex items-center px-6 md:px-14 py-10 md:py-0">
        <div
          className="transition-all duration-1000 ease-out"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(60px)",
            transitionDelay: inView ? "0.1s" : "0s",
          }}
        >
          <div className="text-[12px] tracking-[3px] text-text-caption uppercase mb-3">
            ABOUT ME
          </div>
          <h1 className="text-[32px] md:text-[42px] font-bold text-text-primary tracking-[-0.5px] leading-tight">
            {profile.name}
          </h1>
          <div className="w-10 h-[3px] bg-[#ff6700] my-4" />
          <p className="text-[15px] md:text-[16px] text-text-body leading-relaxed max-w-[400px]">
            {profile.title}
            <br />
            {profile.bio}
          </p>
          <div className="flex gap-3 mt-5">
            <ContactIcon type="email" href={`mailto:${profile.email}`} />
            <ContactIcon type="blog" href={profile.social.blog} />
            <ContactIcon type="github" href={profile.social.github} />
            <ContactIcon type="twitter" href={profile.social.twitter} />
          </div>
          <div className="flex gap-6 md:gap-10 mt-7 pt-5 border-t border-surface-divider">
            <div>
              <span className="font-bold text-text-primary text-[18px] md:text-[20px]">{profile.stats.articles}+</span>
              <span className="text-[12px] text-text-caption ml-1.5">文章</span>
            </div>
            <div>
              <span className="font-bold text-text-primary text-[18px] md:text-[20px]">{profile.stats.photos}+</span>
              <span className="text-[12px] text-text-caption ml-1.5">摄影</span>
            </div>
            <div>
              <span className="font-bold text-text-primary text-[18px] md:text-[20px]">{profile.stats.projects}</span>
              <span className="text-[12px] text-text-caption ml-1.5">项目</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
