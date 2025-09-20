"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaBriefcase, FaArrowUp } from "react-icons/fa";
import { useExperience, Experience as ExperienceType } from "@/hooks/useExperience";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Experience() {
  const { experiences, loading, error } = useExperience();

  // Loading state
  if (loading) {
    return (
      <section
        id="experience"
        className="min-h-screen flex flex-col items-center justify-center bg-background p-6 sm:p-12"
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-foreground mb-16 text-center"
        >
          Professional Experience
        </motion.h1>
        <div className="flex flex-col items-center justify-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-foreground/60">Loading experiences...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section
        id="experience"
        className="min-h-screen flex flex-col items-center justify-center bg-background p-6 sm:p-12"
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-foreground mb-16 text-center"
        >
          Professional Experience
        </motion.h1>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-foreground/60 mb-4">Failed to load experiences</p>
          <p className="text-sm text-foreground/40">{error}</p>
        </div>
      </section>
    );
  }

  // Empty state
  if (!experiences || experiences.length === 0) {
    return (
      <section
        id="experience"
        className="min-h-screen flex flex-col items-center justify-center bg-background p-6 sm:p-12"
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-foreground mb-16 text-center"
        >
          Professional Experience
        </motion.h1>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-foreground/40 text-xl mb-4">💼</div>
          <p className="text-foreground/60">No experiences available at the moment</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col items-center justify-center bg-background p-6 sm:p-12"
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl font-bold text-foreground mb-16 text-center"
      >
        Professional Experience
      </motion.h1>

      <div className="w-full max-w-4xl mx-auto">
        <ol className="relative border-s border-border">
          {experiences.map((experience, index) => (
            <li key={experience.id} className="mb-12 ms-8">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-primary/15 rounded-full -start-4 ring-8 ring-card">
                <FaBriefcase className="w-4 h-4 text-primary" />
              </span>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-6 bg-card text-card-foreground rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-border"
              >
                {/* Shared Company Header */}
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Image
                    src={experience.logo}
                    alt={`${experience.company} Logo`}
                    width={56}
                    height={56}
                    className="rounded-lg shadow-sm flex-shrink-0"
                  />
                  <div className="flex-1">
                    {experience.companyLink ? (
                      <a
                        href={experience.companyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <h3 className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                          {experience.company}
                        </h3>
                      </a>
                    ) : (
                      <h3 className="text-xl font-bold text-foreground">
                        {experience.company}
                      </h3>
                    )}
                    <time className="block mb-2 text-sm font-normal leading-none text-foreground/60 mt-1">
                      {experience.period}
                    </time>
                  </div>
                </div>

                {/* Conditional Rendering for Roles */}
                {experience.roles && experience.roles.length > 0 ? (
                  <div className="mt-4 space-y-6">
                    {experience.roles.map((role, roleIndex) => (
                      <div key={role.id}>
                        {/* Promotion Separator */}
                        {roleIndex > 0 && (
                          <div className="flex items-center text-center my-6">
                            <div className="flex-grow border-t border-border"></div>
                            <span className="flex-shrink mx-4 inline-flex items-center gap-2 text-xs font-semibold uppercase text-primary">
                              <FaArrowUp />
                              Promotion
                            </span>
                            <div className="flex-grow border-t border-border"></div>
                          </div>
                        )}

                        {/* Role Details */}
                        <div>
                          <h4 className="text-lg font-semibold text-foreground">{role.title}</h4>
                          <time className="block mb-2 text-xs font-normal text-foreground/60">{role.period}</time>
                          <ul className="mt-2 space-y-2 text-foreground/70 list-disc pl-5">
                            {role.description.map((desc, idx) => (
                              <li key={idx} className="text-sm sm:text-base leading-relaxed">
                                {desc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}