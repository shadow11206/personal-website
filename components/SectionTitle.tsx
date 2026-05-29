interface SectionTitleProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ label, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-10">
      <div className="text-[13px] tracking-[4px] text-text-caption uppercase mb-3">
        {label}
      </div>
      <h2 className="text-[48px] font-bold text-text-primary tracking-[-1px] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[15px] text-text-secondary mt-3">{subtitle}</p>
      )}
    </div>
  );
}
