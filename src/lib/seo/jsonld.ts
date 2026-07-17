import {
  SITE_CREATOR,
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
  absoluteUrl,
} from "./site";

type JsonLd = Record<string, unknown>;

export function serializeJsonLd(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function buildPersonJsonLd(profile?: {
  name?: string;
  image?: string;
  tagline?: string;
  headlines?: string[];
} | null): JsonLd {
  const name = profile?.name || SITE_CREATOR;
  const description = profile?.tagline || SITE_DESCRIPTION;
  const jobTitle =
    profile?.headlines?.find((h) => h.trim().length > 0) ||
    "Full-Stack Developer";

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name,
    url: SITE_URL,
    image: profile?.image || absoluteUrl("/Logos/ASKHAN_LOGO.png"),
    description,
    jobTitle,
    email: SITE_EMAIL,
    sameAs: [
      SOCIAL_PROFILES.linkedin,
      SOCIAL_PROFILES.github,
      SOCIAL_PROFILES.twitter,
      SOCIAL_PROFILES.facebook,
    ],
  };
}

export function buildWebSiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en",
  };
}

export function buildProfilePageJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: `${SITE_CREATOR} — Portfolio`,
    description: SITE_DESCRIPTION,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    mainEntity: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en",
  };
}

export function buildHomeJsonLd(profile?: {
  name?: string;
  image?: string;
  tagline?: string;
  headlines?: string[];
} | null): JsonLd[] {
  return [
    buildPersonJsonLd(profile),
    buildWebSiteJsonLd(),
    buildProfilePageJsonLd(),
  ];
}

export function buildProjectJsonLd(project: {
  id: string;
  title: string;
  description: string;
  images?: string[];
  techStack?: string[];
  githubLink?: string | null;
  liveLink?: string | null;
  createdAt?: string;
  updatedAt?: string;
}): JsonLd[] {
  const url = absoluteUrl(`/projects/${project.id}`);
  const image =
    project.images && project.images.length > 0
      ? project.images[0]
      : absoluteUrl("/Logos/ASKHAN_LOGO.png");

  const creativeWork: JsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": `${url}#software`,
    name: project.title,
    description: project.description,
    url,
    image,
    author: { "@id": `${SITE_URL}/#person` },
    creator: { "@id": `${SITE_URL}/#person` },
    programmingLanguage: project.techStack || [],
    codeRepository: project.githubLink || undefined,
    dateCreated: project.createdAt,
    dateModified: project.updatedAt,
  };

  if (project.liveLink) {
    creativeWork.sameAs = [project.liveLink];
  }

  const webPage: JsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: project.title,
    description: project.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${url}#software` },
    primaryImageOfPage: image,
    inLanguage: "en",
  };

  const breadcrumb: JsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${SITE_URL}/#projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: url,
      },
    ],
  };

  return [creativeWork, webPage, breadcrumb];
}
