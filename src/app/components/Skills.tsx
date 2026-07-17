"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaJava,
  FaPython,
  FaHtml5,
  FaCss3,
  FaGithub,
  FaJsSquare,
  FaDatabase,
  FaTerminal,
} from "react-icons/fa";
import {
  SiMongodb,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiIntellijidea,
  SiMysql,
  SiFirebase,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiVite,
} from "react-icons/si";
import { useSkills, Skill } from "@/hooks/useSkills";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

type Category = "All" | "Frontend" | "Backend" | "Languages" | "Tools";
type SkillCategory = Exclude<Category, "All">;
type StaticSkill = { name: string; icon: JSX.Element };
type SkillItem = Skill | StaticSkill;

const fallbackSkills: Record<SkillCategory, StaticSkill[]> = {
  Frontend: [
    { name: "React.js", icon: <FaReact size={40} /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={40} /> },
    { name: "HTML5", icon: <FaHtml5 size={40} /> },
    { name: "CSS3", icon: <FaCss3 size={40} /> },
    { name: "JavaScript", icon: <FaJsSquare size={40} /> },
    { name: "TypeScript", icon: <SiTypescript size={40} /> },
    { name: "Redux", icon: <SiRedux size={40} /> },
    { name: "Vite", icon: <SiVite size={40} /> },
  ],
  Backend: [
    { name: "Node.js", icon: <FaNodeJs size={40} /> },
    { name: "Express.js", icon: <FaNodeJs size={40} /> },
    { name: "MongoDB", icon: <SiMongodb size={40} /> },
    { name: "MySQL", icon: <SiMysql size={40} /> },
    { name: "PostgreSQL", icon: <SiPostgresql size={40} /> },
    { name: "Firebase", icon: <SiFirebase size={40} /> },
    { name: "RESTful APIs", icon: <FaDatabase size={40} /> },
    { name: "Prisma ORM", icon: <SiPrisma size={40} /> },
  ],
  Languages: [
    { name: "JavaScript", icon: <FaJsSquare size={40} /> },
    { name: "TypeScript", icon: <SiTypescript size={40} /> },
    { name: "Python", icon: <FaPython size={40} /> },
    { name: "Java", icon: <FaJava size={40} /> },
  ],
  Tools: [
    { name: "Git", icon: <FaGitAlt size={40} /> },
    { name: "GitHub", icon: <FaGithub size={40} /> },
    { name: "Docker", icon: <FaDocker size={40} /> },
    { name: "IntelliJ IDEA", icon: <SiIntellijidea size={40} /> },
    { name: "Postman", icon: <SiPostman size={40} /> },
    { name: "Terminal", icon: <FaTerminal size={40} /> },
  ],
};

const iconMap: Record<string, JSX.Element> = {
  FaReact: <FaReact size={40} />,
  SiTailwindcss: <SiTailwindcss size={40} />,
  FaHtml5: <FaHtml5 size={40} />,
  FaCss3: <FaCss3 size={40} />,
  FaJsSquare: <FaJsSquare size={40} />,
  SiTypescript: <SiTypescript size={40} />,
  SiRedux: <SiRedux size={40} />,
  SiVite: <SiVite size={40} />,
  FaNodeJs: <FaNodeJs size={40} />,
  SiMongodb: <SiMongodb size={40} />,
  SiMysql: <SiMysql size={40} />,
  SiPostgresql: <SiPostgresql size={40} />,
  SiFirebase: <SiFirebase size={40} />,
  FaDatabase: <FaDatabase size={40} />,
  SiPrisma: <SiPrisma size={40} />,
  FaPython: <FaPython size={40} />,
  FaJava: <FaJava size={40} />,
  FaGitAlt: <FaGitAlt size={40} />,
  FaGithub: <FaGithub size={40} />,
  FaDocker: <FaDocker size={40} />,
  SiIntellijidea: <SiIntellijidea size={40} />,
  SiPostman: <SiPostman size={40} />,
  FaTerminal: <FaTerminal size={40} />,
};

const renderSkillIcon = (skill: Skill) => {
  if (skill.iconType === "custom" && skill.iconUrl) {
    return (
      <Image
        src={skill.iconUrl}
        alt={skill.name}
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
    );
  }

  if (skill.iconType === "text") {
    return (
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold text-white"
        style={{ backgroundColor: skill.color || "#7f40ff" }}
      >
        {skill.name.charAt(0).toUpperCase()}
      </div>
    );
  }

  if (skill.iconType === "react-icon" && skill.iconName) {
    return iconMap[skill.iconName] || <FaReact size={40} />;
  }

  return <FaReact size={40} />;
};

export default function Skills({
  initialData,
}: {
  initialData?: Skill[];
}) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px 0px" });
  const { skills, loading, error } = useSkills({
    enabled: inView && !initialData,
    initialData,
  });
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category as SkillCategory;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);

  const skillCategories = (
    Object.keys(skillsByCategory).length > 0 ? skillsByCategory : fallbackSkills
  ) as Record<SkillCategory, SkillItem[]>;
  const categoryNames = Object.keys(skillCategories) as SkillCategory[];
  const filterNames: Category[] = ["All", ...categoryNames];
  const allSkills = categoryNames.flatMap((category) => skillCategories[category]);
  const activeSkills = (
    activeCategory === "All" ? allSkills : skillCategories[activeCategory]
  );

  useEffect(() => {
    if (categoryNames.length > 0 && !filterNames.includes(activeCategory)) {
      setActiveCategory("All");
    }
  }, [activeCategory, categoryNames, filterNames]);

  const getSkillMeta = (skill: SkillItem) => {
    const isDynamicSkill = "id" in skill;
    return {
      id: isDynamicSkill ? skill.id : skill.name,
      name: skill.name,
      icon: isDynamicSkill ? renderSkillIcon(skill) : skill.icon,
      proficiency: isDynamicSkill ? skill.proficiency : undefined,
    };
  };

  const getBentoClass = (index: number) => {
    if (index === 0 || index === 1) {
      return "md:col-span-3 md:row-span-2";
    }
    if (index === 2 || index === 5) {
      return "md:col-span-3 lg:col-span-2";
    }
    return "md:col-span-2";
  };

  if (loading) {
    return (
      <section
        id="skills"
        ref={ref}
        className="flex min-h-screen flex-col items-center justify-center bg-background p-6"
      >
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-foreground/70">Loading skills...</p>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Error loading skills:", error);
  }

  return (
    <section
      id="skills"
      ref={ref}
      className="relative overflow-hidden bg-background py-24 sm:py-32"
    >
      <div className="section-shell">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="section-heading mb-12"
        >
          Tech Stack
        </motion.h2>

        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {filterNames.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(194,164,255,0.22)]"
                    : "border border-border bg-card text-card-foreground hover:border-primary/60 hover:bg-primary/10"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="grid auto-rows-[10rem] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6"
          >
            {activeSkills.map((skill, index) => {
              const skillMeta = getSkillMeta(skill);
              const isFeatured = index < 2;

              return (
                <motion.div
                  key={skillMeta.id}
                  initial={{ opacity: 0, y: 28, scale: 0.96 }}
                  animate={{
                    opacity: 1,
                    y: [0, index % 2 === 0 ? -5 : 5, 0],
                    scale: 1,
                  }}
                  transition={{
                    opacity: { duration: 0.4, delay: index * 0.04 },
                    scale: { duration: 0.45, delay: index * 0.04 },
                    y: {
                      duration: 5 + (index % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.18,
                    },
                  }}
                  whileHover={{
                    y: -10,
                    scale: isFeatured ? 1.025 : 1.045,
                    transition: { duration: 0.28, ease: "easeOut" },
                  }}
                  className={`group relative overflow-hidden border border-border bg-card p-5 text-card-foreground backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 hover:border-primary/70 hover:bg-primary/10 hover:shadow-[0_22px_70px_rgba(194,164,255,0.2)] ${getBentoClass(index)}`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(194,164,255,0.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div
                    className={`relative flex h-full flex-col ${
                      isFeatured
                        ? "items-start justify-between"
                        : "items-center justify-center text-center"
                    }`}
                  >
                    <motion.div
                      animate={{ rotate: [0, index % 2 === 0 ? 4 : -4, 0] }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }}
                      className={`text-primary grayscale transition-all duration-500 group-hover:grayscale-0 ${
                        isFeatured ? "text-6xl" : "text-4xl"
                      }`}
                    >
                      {skillMeta.icon}
                    </motion.div>

                    <div className={isFeatured ? "space-y-3" : "mt-4 space-y-1"}>
                      <span
                        className={`block font-semibold text-foreground ${
                          isFeatured ? "text-3xl sm:text-4xl" : "text-sm"
                        }`}
                      >
                        {skillMeta.name}
                      </span>
                      {isFeatured ? (
                        <p className="max-w-sm text-sm leading-6 text-foreground/60">
                          Core part of my {activeCategory === "All" ? "full-stack" : activeCategory.toLowerCase()} workflow.
                        </p>
                      ) : null}
                      {skillMeta.proficiency && (
                        <span className="block text-xs uppercase tracking-[0.22em] text-primary/80">
                          {skillMeta.proficiency.charAt(0).toUpperCase() +
                            skillMeta.proficiency.slice(1)}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden border border-primary/30 bg-primary/10 p-5 backdrop-blur-xl md:col-span-4 lg:col-span-6"
            >
              <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-primary/20 to-transparent" />
              <div className="relative flex h-full flex-col justify-center gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
                    Animated stack
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-foreground">
                    {activeCategory === "All" ? "All stack" : activeCategory} tools I reach for most.
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeSkills.slice(0, 6).map((skill, index) => {
                    const skillMeta = getSkillMeta(skill);
                    return (
                      <motion.span
                        key={`${skillMeta.id}-pill`}
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 3.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.18,
                        }}
                        className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-foreground/80"
                      >
                        {skillMeta.name}
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
