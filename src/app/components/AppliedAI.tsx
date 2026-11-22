"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { useProjects, type Project } from "@/hooks/useProjects";
import { filterAppliedAIProjects } from "@/lib/ai-projects";
import { useInView } from "react-intersection-observer";

export default function AppliedAI({
  initialData,
}: {
  initialData?: Project[];
}) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px 0px" });
  const { projects } = useProjects({
    enabled: inView && !initialData,
    initialData,
  });

  const aiProjects = filterAppliedAIProjects(projects || []);

  if (aiProjects.length === 0) return null;

  return (
    <section id="applied-ai" ref={ref} className="relative bg-background py-24 sm:py-32">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="section-heading">Applied AI</h2>
          <p className="mt-6 max-w-[46ch] text-base leading-7 text-foreground/70">
            Currently architecting Retrieval-Augmented Generation pipelines at Funavry
            Technologies. The projects below are production builds, not notebooks —
            LangChain and LangGraph workflows, vector retrieval, and LLM-driven features
            shipped into real products.
          </p>
        </motion.div>

        <div className="divide-y divide-border border-t border-border">
          {aiProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.2) }}
              viewport={{ once: true, amount: 0.2 }}
              className="py-7"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-serif text-2xl font-semibold text-foreground">
                  {project.title}
                </h3>
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                >
                  Case study <FiArrowRight />
                </Link>
              </div>
              <p className="mt-3 max-w-[64ch] text-sm leading-6 text-foreground/65">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tag-chip">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
