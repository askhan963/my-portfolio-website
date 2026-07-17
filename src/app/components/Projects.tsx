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

  // Get unique categories from API data
  const categories = useMemo(() => {
    if (!projects || projects.length === 0) return ["All"];
    const uniqueCategories = [...new Set(projects.map(project => project.category))];
    return ["All", ...uniqueCategories];
  }, [projects]);

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return selectedCategory === "All" 
      ? projects 
      : projects.filter(project => project.category === selectedCategory);
  }, [projects, selectedCategory]);

  const projectTransition = {
    type: "spring",
    stiffness: 70,
    damping: 18,
    mass: 0.8,
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="relative overflow-hidden bg-background py-24 sm:py-32"
    >
      <div className="section-shell">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="section-heading mb-14 text-left sm:text-center"
      >
        My <span className="text-primary">Projects</span>
      </motion.h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-foreground/60">Loading projects...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-foreground/60 mb-4">Failed to load projects</p>
          <p className="text-sm text-foreground/40">{error}</p>
        </div>
      ) : (!projects || projects.length === 0) ? (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-foreground/40 text-xl mb-4">🚀</div>
          <p className="text-foreground/60">No projects available at the moment</p>
        </div>
      ) : (

      <div className="mx-auto w-full max-w-7xl">
        <div className="sticky top-24 z-20 mb-14 flex flex-wrap justify-center gap-3 rounded-full border border-border bg-background/78 p-2 backdrop-blur-xl">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(194,164,255,0.22)]"
                  : "border border-border bg-card text-card-foreground hover:border-primary/60 hover:bg-primary/10"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="space-y-10 md:space-y-0">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="relative md:min-h-[60vh]"
              style={{
                zIndex: index + 1,
              }}
            >
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.97, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ ...projectTransition, delay: Math.min(index * 0.06, 0.18) }}
              viewport={{ once: false, amount: 0.18 }}
              className="group min-h-[46vh] origin-top overflow-hidden border border-border bg-card text-card-foreground shadow-[0_28px_90px_rgba(0,0,0,0.38)] backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 hover:border-primary/55 hover:bg-white/[0.075] hover:shadow-[0_34px_110px_rgba(194,164,255,0.14)] md:sticky md:top-40"
            >
              <div className="flex min-h-[46vh] flex-col justify-between gap-6 p-6 sm:p-8 lg:p-10">
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                        Project {(index + 1).toString().padStart(2, "0")}
                      </span>
                      <h2 className="max-w-5xl text-4xl font-semibold leading-none text-foreground sm:text-6xl lg:text-7xl">
                        {project.title}
                      </h2>
                    </div>
                    <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full border border-primary/35 text-sm font-semibold text-primary sm:flex">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                  <p className="max-w-4xl text-base leading-7 text-foreground/68 sm:text-xl sm:leading-8">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-foreground/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.awards && project.awards.length > 0 && (
                    <div className="mt-4">
                      <h4 className="mb-2 text-sm font-semibold text-foreground">Awards & Recognition:</h4>
                      <ul className="space-y-1">
                        {project.awards.map((award, idx) => (
                          <li key={idx} className="flex items-center text-sm text-foreground/70">
                            <span className="mr-2 text-primary">Award</span>
                            {award}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    className="text-2xl text-primary transition-colors duration-300 hover:text-foreground"
                    >
                      <FiGithub />
                    </a>
                  )}
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    className="text-2xl text-primary transition-colors duration-300 hover:text-foreground"
                      title="Live Demo"
                    >
                      <FiExternalLink />
                    </a>
                  )}
                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-colors duration-300 hover:bg-primary/90"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
            </div>
          ))}
        </div>
      </div>
      )}
      </div>
    </section>
  );
}


