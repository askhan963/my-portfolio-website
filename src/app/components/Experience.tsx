"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import { useExperience, type Experience } from "@/hooks/useExperience";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

import { useInView } from "react-intersection-observer";

export default function Experience({
  initialData,
}: {
  initialData?: Experience[];
}) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '200px 0px' });
  const { experiences, loading, error } = useExperience({
    enabled: inView && !initialData,
    initialData,
  });

  return (
    <section
      id="experience"
      ref={ref}
      className="relative bg-background py-24 sm:py-32"
    >
      <div className="section-shell">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-heading mb-16"
        >
          Career path
        </motion.h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-foreground/60">Loading experiences...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-foreground/60">Failed to load experiences</p>
            <p className="mt-2 text-sm text-foreground/40">{error}</p>
          </div>
        ) : (!experiences || experiences.length === 0) ? (
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-foreground/60">No experiences available at the moment</p>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-5xl divide-y divide-border border-t border-border">
            {experiences.map((experience, index) => (
              <motion.article
                key={experience.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.2) }}
                viewport={{ once: true, amount: 0.2 }}
                className="grid gap-6 py-10 sm:grid-cols-[220px_1fr] sm:gap-10"
              >
                <div className="flex items-start gap-4 sm:flex-col sm:items-start sm:gap-3">
                  <Image
                    src={experience.logo}
                    alt={`${experience.company} company logo`}
                    width={48}
                    height={48}
                    sizes="48px"
                    className="h-12 w-12 flex-shrink-0 border border-border bg-white object-contain p-1.5"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {experience.companyLink ? (
                        <a
                          href={experience.companyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-primary"
                        >
                          {experience.company}
                        </a>
                      ) : (
                        experience.company
                      )}
                    </h3>
                    <time className="mt-1 block font-mono text-xs uppercase tracking-[0.1em] text-foreground/50">
                      {experience.period}
                    </time>
                  </div>
                </div>

                {experience.roles && experience.roles.length > 0 ? (
                  <div className="space-y-7">
                    {experience.roles.map((role, roleIndex) => (
                      <div key={role.id}>
                        {roleIndex > 0 && (
                          <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                            <FaArrowUp size={10} />
                            Promotion
                          </div>
                        )}
                        <h4 className="text-base font-semibold text-foreground">{role.title}</h4>
                        <time className="mt-1 block text-xs text-foreground/50">{role.period}</time>
                        <ul className="mt-3 space-y-2">
                          {role.description.map((desc, idx) => (
                            <li key={idx} className="max-w-[60ch] text-sm leading-relaxed text-foreground/70">
                              {desc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : null}
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
