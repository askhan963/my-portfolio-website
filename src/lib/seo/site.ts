export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://awaiskhanniazi.vercel.app";

export const SITE_NAME = "ASKHAN Portfolio";

export const SITE_CREATOR = "Muhammad Awais Khan";

export const SITE_EMAIL = "awaiskhanniazi963@gmail.com";

export const SITE_DESCRIPTION =
  "Portfolio of Muhammad Awais Khan — full-stack engineer shipping production web applications and applied-AI features (RAG, LLM workflows, agents).";

export const SITE_KEYWORDS = [
  "Muhammad Awais Khan",
  "ASKHAN",
  "Awais Khan",
  "Full-Stack Developer",
  "Applied AI Engineer",
  "RAG Engineer",
  "LangChain Developer",
  "MERN Stack Developer",
  "Next.js Developer",
  "React Developer",
  "Portfolio",
  "Web Developer",
];

export const SOCIAL_PROFILES = {
  linkedin: "https://www.linkedin.com/in/askhan963/",
  github: "https://github.com/askhan963",
  twitter: "https://twitter.com/askhan963",
  facebook: "https://www.facebook.com/askhan963",
} as const;

export const THEME_COLOR = "#10140f";

export function absoluteUrl(path: string = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "" : normalized}`;
}
