import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProjectDetails from './ProjectDetails';
import { Metadata } from 'next';

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    return {
      title: 'Project Not Found | Portfolio',
    };
  }

  return {
    title: project.seoTitle ? `${project.seoTitle} | Portfolio` : `${project.title} | Portfolio`,
    description: project.seoDescription || project.description,
    openGraph: {
      title: project.seoTitle || project.title,
      description: project.seoDescription || project.description,
      images: project.images.length > 0 ? [project.images[0]] : [],
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

  // Serialize the dates to strings because Client Components cannot receive Date objects directly if not strictly needed as Date
  // Actually, implementation of ProjectDetails expects Date objects for createdAt/updatedAt? 
  // Let's check ProjectDetails interface.
  // interface Project { createdAt: Date; ... }
  // Server components pass data to Client components via props.
  // Next.js serializes props. JSON does not support Date objects.
  // They will be passed as strings if not careful, OR Next.js handles it?
  // Next.js Server Components -> Client Components serialization warns about Dates.
  // It is safer to convert them to strings or pass them as is if Next.js supports it in recent versions (it usually warns).
  // However, `prisma` returns Date objects.
  // Let's modify the interface in ProjectDetails to accept strings or Date, or just pass them and let's see.
  // Actually, standard practice is to pass basic JSON types.
  // I will pass them as is. If it warnings, I will fix. 
  // Wait, I should probably check if I need to transform.
  // For now I will pass as is.
  
  // Convert dates to strings to avoid "Date object not supported" warning
  const serializedProject = {
    ...project,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };

  return <ProjectDetails project={serializedProject} />;
}
