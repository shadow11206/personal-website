import profile from "@/data/profile.json";
import ContactIcon from "./ContactIcon";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="h-screen w-full flex bg-white overflow-hidden"
      data-section="about"
    >
      {/* Left: full-bleed image — 45% */}
      <div
        className="w-[45%] h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${profile.avatar})` }}
      />

      {/* Right: text content — 55% */}
      <div className="flex-1 flex items-center px-16">
        <div>
          {/* Label */}
          <div className="text-[13px] tracking-[4px] text-text-caption uppercase mb-4">
            ABOUT ME
          </div>

          {/* Name */}
          <h1 className="text-[48px] font-bold text-text-primary tracking-[-1px] leading-tight">
            {profile.name}
          </h1>

          {/* Orange divider */}
          <div className="w-12 h-[3px] bg-[#ff6700] my-5" />

          {/* Bio */}
          <p className="text-[16px] text-text-body leading-relaxed max-w-[460px]">
            {profile.title}
            <br />
            {profile.bio}
          </p>

          {/* Contact icons */}
          <div className="flex gap-3 mt-6">
            <ContactIcon type="email" href={`mailto:${profile.email}`} />
            <ContactIcon type="blog" href={profile.social.blog} />
            <ContactIcon type="github" href={profile.social.github} />
            <ContactIcon type="twitter" href={profile.social.twitter} />
          </div>

          {/* Stats row */}
          <div className="flex gap-12 mt-8 pt-5 border-t border-surface-divider">
            <div>
              <span className="font-bold text-text-primary text-[24px]">{profile.stats.articles}+</span>
              <span className="text-[12px] text-text-caption ml-2">文章</span>
            </div>
            <div>
              <span className="font-bold text-text-primary text-[24px]">{profile.stats.photos}+</span>
              <span className="text-[12px] text-text-caption ml-2">摄影</span>
            </div>
            <div>
              <span className="font-bold text-text-primary text-[24px]">{profile.stats.projects}</span>
              <span className="text-[12px] text-text-caption ml-2">项目</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
