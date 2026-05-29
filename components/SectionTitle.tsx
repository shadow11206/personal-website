interface SectionTitleProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ label, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-8">
      <div className="text-[10px] tracking-[3px] text-text-caption uppercase mb-2">
        {label}
      </div>
      <h2 className="text-[36px] font-bold text-text-primary tracking-[-0.5px] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[13px] text-text-secondary mt-2">{subtitle}</p>
      )}
    </div>
  );
}
