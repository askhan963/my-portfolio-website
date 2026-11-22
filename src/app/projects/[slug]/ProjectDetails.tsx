'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Markdown from 'react-markdown';
import { FiGithub, FiExternalLink, FiArrowLeft, FiCalendar } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink: string | null;
  liveLink: string | null;
  images: string[];
  awards: string[];
  category: string;
  content: string | null;
  problemStatement: string | null;
  solution: string | null;
  features: string[];
  challenges: string[];
  learnings: string[];
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const sideNotes = [
    { label: "Key features", items: project.features },
    { label: "Challenges", items: project.challenges },
    { label: "Learnings", items: project.learnings },
  ].filter((note) => note.items && note.items.length > 0);

  return (
    <main className="min-h-screen bg-background px-4 py-28 text-foreground sm:px-6 lg:px-8">
      <article className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center text-sm font-semibold text-foreground/60 transition-colors hover:text-primary"
          >
            <FiArrowLeft className="mr-2" />
            Back to projects
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mb-12 border-b border-border pb-10"
        >
          <h1 className="section-heading max-w-4xl">{project.title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-foreground/55">
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-primary">{project.category}</span>
            <span className="flex items-center gap-2">
              <FiCalendar />
              {new Date(project.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {project.images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <div className="overflow-hidden border border-border">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  pagination={{ clickable: true }}
                  navigation
                  autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                  loop={project.images.length > 1}
                  className="h-[300px] w-full sm:h-[400px]"
                >
                  {project.images.map((img, idx) => (
                    <SwiperSlide key={idx} className="bg-muted">
                      <div className="relative h-full w-full">
                        <Image
                          src={img}
                          alt={`${project.title} screenshot ${idx + 1}`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                          priority={idx === 0}
                          fetchPriority={idx === 0 ? "high" : "auto"}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="flex flex-col gap-8"
          >
            <p className="max-w-[64ch] text-lg leading-8 text-foreground/75 whitespace-pre-line">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="tag-chip">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {(project.problemStatement || project.solution) && (
          <div className="mt-16 grid grid-cols-1 gap-10 border-t border-border pt-10 sm:grid-cols-2 sm:divide-x sm:divide-border">
            {project.problemStatement && (
              <div className="sm:pr-10">
                <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground/55">The problem</h2>
                <p className="mt-3 text-base leading-7 text-foreground/75">{project.problemStatement}</p>
              </div>
            )}
            {project.solution && (
              <div className="sm:pl-10">
                <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">The solution</h2>
                <p className="mt-3 text-base leading-7 text-foreground/75">{project.solution}</p>
              </div>
            )}
          </div>
        )}

        {sideNotes.length > 0 && (
          <div className="mt-16 grid grid-cols-1 gap-10 border-t border-border pt-10 sm:grid-cols-3">
            {sideNotes.map((note) => (
              <div key={note.label}>
                <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground/55">{note.label}</h2>
                <ul className="mt-4 space-y-2.5">
                  {note.items.map((item, idx) => (
                    <li key={idx} className="text-sm leading-6 text-foreground/75">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {project.content && (
          <div className="mt-16 border-t border-border pt-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground/55">Case study</h2>
            <div className="prose prose-lg prose-invert mt-5 max-w-[72ch] text-foreground/80">
              <Markdown>{project.content}</Markdown>
            </div>
          </div>
        )}

        {project.awards && project.awards.length > 0 && (
          <div className="mt-16 border-t border-border pt-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground/55">Awards &amp; recognition</h2>
            <ul className="mt-4 space-y-2">
              {project.awards.map((award, idx) => (
                <li key={idx} className="text-sm text-foreground/75">
                  <span className="text-primary">·</span> {award}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-10 sm:flex-row">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-3 border border-border px-6 py-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <FiGithub className="text-lg" />
              View code
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-3 border border-primary bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <FiExternalLink className="text-lg" />
              Live demo
            </a>
          )}
        </div>
      </article>
    </main>
  );
}
