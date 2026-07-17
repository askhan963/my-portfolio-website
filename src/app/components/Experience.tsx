"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import { useExperience, type Experience } from "@/hooks/useExperience";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

import { useInView } from "react-intersection-observer";

const cardTransition = {
  type: "spring",
  stiffness: 72,
  damping: 18,
  mass: 0.8,
};

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
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="section-heading mb-20"
      >
        Career <span className="font-light">Path</span>
      </motion.h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-foreground/60">Loading experiences...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-foreground/60 mb-4">Failed to load experiences</p>
          <p className="text-sm text-foreground/40">{error}</p>
        </div>
      ) : (!experiences || experiences.length === 0) ? (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-foreground/40 text-xl mb-4">💼</div>
          <p className="text-foreground/60">No experiences available at the moment</p>
        </div>
      ) : (

      <div className="mx-auto w-full max-w-5xl">
        <ol className="relative space-y-10 md:space-y-0">
          {experiences.map((experience, index) => (
            <li
              key={experience.id}
              className="relative md:min-h-[125vh]"
              style={{ zIndex: index + 1 }}
            >
              <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-primary/70 to-transparent md:block" />
              <motion.div
                initial={{ opacity: 0, y: 72, scale: 0.975, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                transition={{ ...cardTransition, delay: Math.min(index * 0.08, 0.24) }}
                viewport={{ once: false, amount: 0.28 }}
                className="corner-frame ml-0 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.38)] transition-[background-color,border-color,box-shadow,transform] duration-500 ease-out hover:border-primary/55 hover:bg-white/[0.07] hover:shadow-[0_34px_110px_rgba(194,164,255,0.16)] md:sticky md:top-28 md:ml-12 md:p-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                  viewport={{ once: false, amount: 0.4 }}
                  className="mb-8 flex items-center justify-between gap-6 border-b border-border pb-6"
                >
                  <div className="flex flex-col items-start gap-4 sm:flex-row">
                    <Image
                      src={experience.logo}
                      alt={`${experience.company} company logo`}
                      width={64}
                      height={64}
                      sizes="64px"
                      className="h-16 w-16 flex-shrink-0 rounded-lg border border-border bg-white/90 object-contain p-1.5 shadow-sm"
                    />
                    <div className="flex-1">
                      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                        Experience {String(index + 1).padStart(2, "0")}
                      </span>
                      {experience.companyLink ? (
                        <a
                          href={experience.companyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <h3 className="text-2xl font-medium text-foreground transition-colors hover:text-primary">
                            {experience.company}
                          </h3>
                        </a>
                      ) : (
                        <h3 className="text-2xl font-medium text-foreground">
                          {experience.company}
                        </h3>
                      )}
                      <time className="mt-2 block text-sm font-normal uppercase tracking-[0.2em] text-foreground/55">
                        {experience.period}
                      </time>
                    </div>
                  </div>
                  <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full border border-primary/35 text-sm font-semibold text-primary md:flex">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </motion.div>

                {experience.roles && experience.roles.length > 0 ? (
                  <div className="space-y-7">
                    {experience.roles.map((role, roleIndex) => (
                      <motion.div
                        key={role.id}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.55,
                          ease: [0.22, 1, 0.36, 1],
                          delay: 0.12 + roleIndex * 0.08,
                        }}
                        viewport={{ once: false, amount: 0.35 }}
                      >
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

                        <div>
                          <h4 className="text-lg font-semibold text-foreground">{role.title}</h4>
                          <time className="block mb-2 text-xs font-normal text-foreground/60">{role.period}</time>
                          <ul className="mt-2 space-y-2 text-foreground/68">
                            {role.description.map((desc, idx) => (
                              <li key={idx} className="border-l border-primary/35 pl-4 text-sm leading-relaxed sm:text-base">
                                {desc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : null}
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
      )}
      </div>
    </section>
  );
}
