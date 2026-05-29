type IconType = "email" | "blog" | "github" | "twitter";

interface ContactIconProps {
  type: IconType;
  href: string;
}

const iconPaths: Record<IconType, string> = {
  email:
    "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 4L12 13 2 4",
  blog:
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  github:
    "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
  twitter:
    "M4 4l7.5 10L4 20h1.5l6-7 5 7H22l-8-10.5L21 4h-1.5l-5.5 6.5L9 4H4z",
};

const iconSizes: Record<IconType, number> = {
  email: 18,
  blog: 18,
  github: 18,
  twitter: 16,
};

export default function ContactIcon({ type, href }: ContactIconProps) {
  const size = iconSizes[type];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="contact-icon"
      aria-label={type}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={iconPaths[type]} />
      </svg>
    </a>
  );
}
