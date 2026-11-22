"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { useProjects, type Project } from "@/hooks/useProjects";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Link from "next/link";

import { useInView } from "react-intersection-observer";

export default function Projects({
  initialData,
}: {
  initialData?: Project[];
}) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '200px 0px' });
  const { projects, loading, error } = useProjects({
    enabled: inView && !initialData,
    initialData,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    if (!projects || projects.length === 0) return ["All"];
    const uniqueCategories = [...new Set(projects.map(project => project.category))];
    return ["All", ...uniqueCategories];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return selectedCategory === "All"
      ? projects
      : projects.filter(project => project.category === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative bg-background py-24 sm:py-32"
    >
      <div className="section-shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="section-heading"
          >
            Featured projects
          </motion.h2>

          {categories.length > 1 && (
            <div className="flex flex-wrap gap-5">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`border-b-2 pb-1 text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "border-primary text-foreground"
                      : "border-transparent text-foreground/50 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <div className="mt-16 flex flex-col items-center justify-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-foreground/60">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="mt-16 flex flex-col items-center justify-center text-center">
            <p className="text-foreground/60">Failed to load projects</p>
            <p className="mt-2 text-sm text-foreground/40">{error}</p>
          </div>
        ) : (!projects || projects.length === 0) ? (
          <div className="mt-16 flex flex-col items-center justify-center text-center">
            <p className="text-foreground/60">No projects available at the moment</p>
          </div>
        ) : (
          <div className="mt-12 divide-y divide-border border-t border-border">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.16) }}
                viewport={{ once: true, amount: 0.15 }}
                className="grid gap-6 py-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14"
              >
                <div>
                  <h3 className="font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                    {project.title}
                  </h3>
                  <span className="section-figure mt-3 inline-block">{project.category}</span>
                  <div className="mt-6 flex items-center gap-5">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-foreground/60 transition-colors hover:text-primary"
                        aria-label="View source on GitHub"
                      >
                        <FiGithub />
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-foreground/60 transition-colors hover:text-primary"
                        aria-label="View live demo"
                      >
                        <FiExternalLink />
                      </a>
                    )}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      Read case study →
                    </Link>
                  </div>
                </div>

                <div>
                  <p className="max-w-[64ch] text-base leading-7 text-foreground/70">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="tag-chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.awards && project.awards.length > 0 && (
                    <ul className="mt-5 space-y-1.5">
                      {project.awards.map((award) => (
                        <li key={award} className="text-sm text-foreground/60">
                          <span className="text-primary">·</span> {award}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
