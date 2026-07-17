"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";
import { useEducation } from "@/hooks/useEducation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

import { useInView } from "react-intersection-observer";

const Education = () => {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '200px 0px' });
  const { education, loading, error } = useEducation({ enabled: inView });

  // Fallback data if no education is found
  const fallbackEducation = [
    {
      institution: "COMSATS University Islamabad, Abbottabad Campus",
      degree: "BS Computer Science",
      period: "2020 - 2024",
      cgpa: "3.37",
      coreCourses: [
        "Data Structures & Algorithms",
        "Web Development",
        "Software Engineering",
        "Artificial Intelligence",
        "Machine Learning",
        "VR Development",
        "Database Systems",
        "Operating Systems",
      ],
      logo: "https://res.cloudinary.com/dfq1peuay/image/upload/v1758349296/education/hxmnj3v6dmiqak5rftbx.jpg",
      link: "https://www.cuiatd.edu.pk/",
    },
    {
      institution: "MLWHS School Makerwal",
      degree: "Intermediate in Computer Science (ICS)",
      period: "2018 - 2020",
      coreCourses: ["Physics", "Computer Science", "Mathematics"],
      logo: "https://res.cloudinary.com/dfq1peuay/image/upload/v1758349592/education/q3eqgpevo8zr6xqv236b.jpg",
      link: "https://m.facebook.com/MLWHSSM/?profile_tab_item_selected=about",
    },
  ];

  const displayEducation = education.length > 0 ? education : fallbackEducation;

  if (loading) {
    return (
      <section
        id="education"
        ref={ref}
        className="min-h-screen flex flex-col items-center justify-center bg-background p-6 sm:p-12"
      >
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-foreground/70">Loading education...</p>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Error loading education:", error);
  }

  return (
    <section
      id="education"
      ref={ref}
      className="relative overflow-hidden bg-background py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="section-shell">
        <motion.p
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="section-kicker"
        >
          Academic foundation
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: -32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="section-heading mb-16"
        >
          Education & Academics
        </motion.h1>

      <div className="mx-auto w-full max-w-6xl">
        <ol className="relative grid gap-8 lg:grid-cols-2">
          <div className="absolute left-1/2 top-10 hidden h-[calc(100%-5rem)] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/70 to-transparent lg:block" />
          {displayEducation.map((edu, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 56, scale: 0.97, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{
                type: "spring",
                stiffness: 72,
                damping: 18,
                delay: index * 0.12,
              }}
              viewport={{ once: true, amount: 0.28 }}
              className={`${index % 2 === 0 ? "lg:pt-0" : "lg:pt-24"}`}
            >
              <div className="corner-frame group relative overflow-hidden p-6 shadow-[0_28px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-[background-color,border-color,box-shadow,transform] duration-500 hover:-translate-y-2 hover:border-primary/60 hover:bg-white/[0.07] hover:shadow-[0_34px_110px_rgba(194,164,255,0.14)] sm:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(194,164,255,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex flex-col gap-6">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex min-w-0 items-start gap-4">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 4.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.25,
                        }}
                        className="relative h-16 w-16 shrink-0 overflow-hidden border border-border bg-white/90 p-1.5 shadow-sm"
                      >
                        <Image
                          src={edu.logo}
                          alt={`${edu.institution} Logo`}
                          fill
                          className="object-contain p-1"
                        />
                      </motion.div>
                      <div className="min-w-0 flex-1">
                        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                          {edu.period}
                        </span>
                        {edu.link ? (
                          <a
                            href={edu.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block"
                          >
                            <h3 className="text-2xl font-semibold leading-tight text-foreground transition-colors hover:text-primary">
                              {edu.institution}
                            </h3>
                          </a>
                        ) : (
                          <h3 className="text-2xl font-semibold leading-tight text-foreground">
                          {edu.institution}
                          </h3>
                        )}
                        <p className="mt-3 text-lg font-medium text-primary">
                          {edu.degree}
                        </p>
                      </div>
                    </div>
                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/35 text-primary sm:flex">
                      <FaGraduationCap className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="grid gap-5 border-t border-border pt-6 sm:grid-cols-[auto_1fr]">
                    {edu.cgpa && (
                      <div className="flex h-28 w-28 flex-col items-center justify-center border border-primary/35 bg-primary/10 text-center">
                        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                          CGPA
                        </span>
                        <span className="mt-2 text-3xl font-semibold text-foreground">
                          {edu.cgpa}
                        </span>
                        <span className="text-xs text-foreground/45">/ 4.0</span>
                      </div>
                    )}

                    <div>
                      <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-foreground/70">
                        Core Courses
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.coreCourses?.map((item, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: idx * 0.035 }}
                            viewport={{ once: true }}
                            className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-foreground/75"
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
      </div>
    </section>
  );
};

export default Education;
