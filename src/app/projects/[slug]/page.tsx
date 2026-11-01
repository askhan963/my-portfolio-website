import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProjectDetails from './ProjectDetails';
import { Metadata } from 'next';
import { buildProjectJsonLd, serializeJsonLd } from '@/lib/seo/jsonld';
import { SITE_NAME, absoluteUrl } from '@/lib/seo/site';

export const revalidate = 3600;

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const OBJECT_ID_RE = /^[0-9a-fA-F]{24}$/;

// Legacy project URLs used the raw Mongo id; resolve those by id too so old,
// already-indexed links can be 308-redirected to the canonical slug URL.
async function resolveProject(slugOrId: string) {
  const bySlug = await prisma.project.findUnique({ where: { slug: slugOrId } });
  if (bySlug) {
    return { project: bySlug, legacy: false };
  }

  if (OBJECT_ID_RE.test(slugOrId)) {
    const byId = await prisma.project.findUnique({ where: { id: slugOrId } });
    if (byId) {
      return { project: byId, legacy: true };
    }
  }

  return { project: null, legacy: false };
}

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({
    where: { slug: { not: null } },
    select: { slug: true },
  });

  return projects.map((project) => ({
    slug: project.slug as string,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  const { project } = await resolveProject(slug);

  if (!project || !project.slug) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
      robots: { index: false, follow: false },
    };
  }

  const title = project.seoTitle || project.title;
  const description = project.seoDescription || project.description;
  const url = absoluteUrl(`/projects/${project.slug}`);
  const image =
    project.images.length > 0
      ? project.images[0]
      : absoluteUrl('/Logos/ASKHAN_LOGO.png');

  return {
    title,
    description,
    authors: [{ name: 'Muhammad Awais Khan' }],
    creator: 'Muhammad Awais Khan',
    publisher: 'Muhammad Awais Khan',
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      type: 'article',
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const { project, legacy } = await resolveProject(slug);

  if (!project || !project.slug) {
    notFound();
  }

  if (legacy) {
    redirect(`/projects/${project.slug}`);
  }

  const serializedProject = {
    ...project,
    slug: project.slug,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };

  const jsonLd = buildProjectJsonLd(serializedProject);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <ProjectDetails project={serializedProject} />
    </>
  );
}
