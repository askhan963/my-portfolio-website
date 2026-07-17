import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProjectDetails from './ProjectDetails';
import { Metadata } from 'next';
import { buildProjectJsonLd, serializeJsonLd } from '@/lib/seo/jsonld';
import { SITE_NAME, absoluteUrl } from '@/lib/seo/site';

export const revalidate = 3600;

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({
    select: { id: true },
  });

  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
      robots: { index: false, follow: false },
    };
  }

  const title = project.seoTitle || project.title;
  const description = project.seoDescription || project.description;
  const url = absoluteUrl(`/projects/${project.id}`);
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
      canonical: `/projects/${project.id}`,
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
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  const serializedProject = {
    ...project,
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
