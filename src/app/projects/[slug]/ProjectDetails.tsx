'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Markdown from 'react-markdown';
import { FiGithub, FiExternalLink, FiArrowLeft, FiCalendar, FiAward, FiTag } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Define the Project type based on the Prisma schema and hooks
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
  // New Case Study Fields
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
  return (
    <main className="min-h-screen bg-background text-foreground py-20 px-4 sm:px-6 lg:px-8">
      <article className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-lg font-medium"
          >
            <FiArrowLeft className="mr-2" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Title and Category */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 text-center lg:text-left"
        >
           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-primary">
              {project.title}
            </h1>
            <span className="inline-block px-6 py-2 rounded-full text-lg font-semibold bg-primary/10 text-primary border border-primary/20 self-center lg:self-auto">
              {project.category}
            </span>
          </div>
          <div className="flex items-center justify-center lg:justify-start text-foreground/60 gap-4 mt-2">
             <span className="flex items-center">
                <FiCalendar className="mr-2" />
                {new Date(project.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
             </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border bg-card">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                pagination={{ clickable: true }}
                navigation
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={project.images.length > 1}
                className="w-full h-[300px] sm:h-[400px]"
              >
                {project.images.map((img, idx) => (
                  <SwiperSlide key={idx} className="bg-muted">
                    <div className="relative w-full h-full">
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

          {/* Project Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col space-y-8"
          >
            {/* Description */}
            <div className="bg-card p-6 rounded-xl border border-border shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center">
                Project Overview
              </h2>
              <p className="text-lg leading-relaxed text-foreground/80 whitespace-pre-line">
                {project.description}
              </p>
            </div>

          

          </motion.div>
        </div>

        {/* Tech Stack */}
        <div className="bg-card p-6 rounded-xl border border-border shadow-md mt-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center">
                 <FiTag className="mr-2 text-primary" />
                 Tech Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-background/50 hover:bg-primary/10 rounded-lg text-primary border border-primary/20 transition-colors duration-200 text-sm md:text-base font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            
            {/* Problem & Solution */}
            {(project.problemStatement || project.solution) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                 {project.problemStatement && (
                    <div className="bg-red-500/5 p-6 rounded-xl border border-red-500/10 shadow-sm">
                      <h3 className="text-xl font-bold mb-3 text-red-600 dark:text-red-400">The Problem</h3>
                      <p className="text-foreground/80 leading-relaxed">{project.problemStatement}</p>
                    </div>
                 )}
                 {project.solution && (
                    <div className="bg-green-500/5 p-6 rounded-xl border border-green-500/10 shadow-sm">
                      <h3 className="text-xl font-bold mb-3 text-green-600 dark:text-green-400">The Solution</h3>
                      <p className="text-foreground/80 leading-relaxed">{project.solution}</p>
                    </div>
                 )}
              </div>
            )}

            {/* Features, Challenges, Learnings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
               {project.features && project.features.length > 0 && (
                 <div className="bg-card p-6 rounded-xl border border-border shadow-md">
                    <h3 className="text-lg font-bold mb-3 text-primary">Key Features</h3>
                    <ul className="list-disc list-inside space-y-2 text-foreground/80">
                      {project.features.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                 </div>
               )}
               {project.challenges && project.challenges.length > 0 && (
                 <div className="bg-card p-6 rounded-xl border border-border shadow-md">
                    <h3 className="text-lg font-bold mb-3 text-orange-500">Challenges</h3>
                    <ul className="list-disc list-inside space-y-2 text-foreground/80">
                      {project.challenges.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                 </div>
               )}
               {project.learnings && project.learnings.length > 0 && (
                 <div className="bg-card p-6 rounded-xl border border-border shadow-md">
                    <h3 className="text-lg font-bold mb-3 text-blue-500">Learnings</h3>
                    <ul className="list-disc list-inside space-y-2 text-foreground/80">
                      {project.learnings.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                 </div>
               )}
            </div>

            {/* Detailed Content / Case Study */}
            {project.content && (
              <div className="bg-card p-8 rounded-xl border border-border shadow-md mt-8">
                <h2 className="text-2xl font-bold mb-6 text-foreground border-b border-border pb-2">
                  Case Study
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap font-body text-foreground/80">
                  {/* Basic markdown rendering - can be upgraded to react-markdown later */}
                  <Markdown>{project.content}</Markdown>
                </div>
              </div>
            )}

            {/* Awards */}
            {project.awards && project.awards.length > 0 && (
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-xl border border-yellow-500/20 shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-yellow-600 dark:text-yellow-400 flex items-center">
                  <FiAward className="mr-2" />
                  Awards & Recognition
                </h2>
                <ul className="space-y-2">
                  {project.awards.map((award, idx) => (
                    <li key={idx} className="flex items-start text-foreground/80">
                      <span className="mr-2 mt-1.5 text-yellow-500">★</span>
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center px-8 py-4 bg-card hover:bg-card/80 text-foreground border border-border rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 group"
                >
                  <FiGithub className="mr-3 text-2xl group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-semibold">View Code</span>
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-300 shadow-md hover:shadow-lg shadow-primary/25 hover:-translate-y-1 group"
                >
                  <FiExternalLink className="mr-3 text-2xl group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-semibold">Live Demo</span>
                </a>
              )}
            </div>
      </article>
    </main>
  );
}
