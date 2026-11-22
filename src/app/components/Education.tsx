"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEducation, type Education as EducationType } from "@/hooks/useEducation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

import { useInView } from "react-intersection-observer";

const Education = ({
  initialData,
}: {
  initialData?: EducationType[];
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '200px 0px' });
  const { education, loading, error } = useEducation({
    enabled: inView && !initialData,
    initialData,
  });

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
      <section id="education" ref={ref} className="flex min-h-[40vh] flex-col items-center justify-center bg-background p-6">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-foreground/70">Loading education...</p>
      </section>
    );
  }

  if (error) {
    console.error("Error loading education:", error);
  }

  return (
    <section id="education" ref={ref} className="relative bg-background py-24 sm:py-32">
      <div className="section-shell">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-heading mb-14"
        >
          Education
        </motion.h2>

        <div className="mx-auto w-full max-w-5xl divide-y divide-border border-t border-border">
          {displayEducation.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.18) }}
              viewport={{ once: true, amount: 0.3 }}
              className="grid gap-6 py-8 sm:grid-cols-[72px_1fr_auto] sm:items-center sm:gap-8"
            >
              <div className="relative h-16 w-16 border border-border bg-white p-1.5">
                <Image
                  src={edu.logo}
                  alt={`${edu.institution} logo`}
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                />
              </div>

              <div>
                {edu.link ? (
                  <a
                    href={edu.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    {edu.institution}
                  </a>
                ) : (
                  <h3 className="text-lg font-semibold text-foreground">{edu.institution}</h3>
                )}
                <p className="mt-1 text-sm text-primary">{edu.degree}</p>
                {edu.coreCourses && edu.coreCourses.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {edu.coreCourses.map((item) => (
                      <span key={item} className="tag-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="font-mono text-xs uppercase tracking-[0.1em] text-foreground/50 sm:text-right">
                <p>{edu.period}</p>
                {edu.cgpa && <p className="mt-1 text-primary">CGPA {edu.cgpa}/4.0</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
