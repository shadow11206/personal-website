import profile from "@/data/profile.json";
import ContactIcon from "./ContactIcon";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="h-screen w-full flex overflow-hidden"
      style={{ background: "linear-gradient(160deg, #faf8f5 0%, #f5f0e8 50%, #efe4d4 100%)" }}
      data-section="about"
    >
      {/* Left: full-bleed image — 45% */}
      <div
        className="w-[45%] h-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${profile.avatar})` }}
      >
      </div>

      {/* Right: text content — 55% */}
      <div className="flex-1 flex items-center px-14">
        <div>
          {/* Label */}
          <div className="text-[12px] tracking-[3px] text-text-caption uppercase mb-3">
            ABOUT ME
          </div>

          {/* Name */}
          <h1 className="text-[42px] font-bold text-text-primary tracking-[-0.5px] leading-tight">
            {profile.name}
          </h1>

          {/* Orange divider */}
          <div className="w-10 h-[3px] bg-[#ff6700] my-4" />

          {/* Bio */}
          <p className="text-[16px] text-text-body leading-relaxed max-w-[400px]">
            {profile.title}
            <br />
            {profile.bio}
          </p>

          {/* Contact icons */}
          <div className="flex gap-3 mt-5">
            <ContactIcon type="email" href={`mailto:${profile.email}`} />
            <ContactIcon type="blog" href={profile.social.blog} />
            <ContactIcon type="github" href={profile.social.github} />
            <ContactIcon type="twitter" href={profile.social.twitter} />
          </div>

          {/* Stats row */}
          <div className="flex gap-10 mt-7 pt-5 border-t border-surface-divider">
            <div>
              <span className="font-bold text-text-primary text-[20px]">{profile.stats.articles}+</span>
              <span className="text-[12px] text-text-caption ml-1.5">文章</span>
            </div>
            <div>
              <span className="font-bold text-text-primary text-[20px]">{profile.stats.photos}+</span>
              <span className="text-[12px] text-text-caption ml-1.5">摄影</span>
            </div>
            <div>
              <span className="font-bold text-text-primary text-[20px]">{profile.stats.projects}</span>
              <span className="text-[12px] text-text-caption ml-1.5">项目</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
