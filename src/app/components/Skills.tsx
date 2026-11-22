"use client";

import { useMemo, useState } from "react";
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

type Category = "All" | string;
type StaticSkill = { name: string; icon: JSX.Element };
type SkillItem = Skill | StaticSkill;

const fallbackSkills: Record<string, StaticSkill[]> = {
  Frontend: [
    { name: "React.js", icon: <FaReact size={16} /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={16} /> },
    { name: "HTML5", icon: <FaHtml5 size={16} /> },
    { name: "CSS3", icon: <FaCss3 size={16} /> },
    { name: "JavaScript", icon: <FaJsSquare size={16} /> },
    { name: "TypeScript", icon: <SiTypescript size={16} /> },
    { name: "Redux", icon: <SiRedux size={16} /> },
    { name: "Vite", icon: <SiVite size={16} /> },
  ],
  Backend: [
    { name: "Node.js", icon: <FaNodeJs size={16} /> },
    { name: "Express.js", icon: <FaNodeJs size={16} /> },
    { name: "MongoDB", icon: <SiMongodb size={16} /> },
    { name: "MySQL", icon: <SiMysql size={16} /> },
    { name: "PostgreSQL", icon: <SiPostgresql size={16} /> },
    { name: "Firebase", icon: <SiFirebase size={16} /> },
    { name: "RESTful APIs", icon: <FaDatabase size={16} /> },
    { name: "Prisma ORM", icon: <SiPrisma size={16} /> },
  ],
  Languages: [
    { name: "JavaScript", icon: <FaJsSquare size={16} /> },
    { name: "TypeScript", icon: <SiTypescript size={16} /> },
    { name: "Python", icon: <FaPython size={16} /> },
    { name: "Java", icon: <FaJava size={16} /> },
  ],
  Tools: [
    { name: "Git", icon: <FaGitAlt size={16} /> },
    { name: "GitHub", icon: <FaGithub size={16} /> },
    { name: "Docker", icon: <FaDocker size={16} /> },
    { name: "IntelliJ IDEA", icon: <SiIntellijidea size={16} /> },
    { name: "Postman", icon: <SiPostman size={16} /> },
    { name: "Terminal", icon: <FaTerminal size={16} /> },
  ],
};

const iconMap: Record<string, JSX.Element> = {
  FaReact: <FaReact size={16} />,
  SiTailwindcss: <SiTailwindcss size={16} />,
  FaHtml5: <FaHtml5 size={16} />,
  FaCss3: <FaCss3 size={16} />,
  FaJsSquare: <FaJsSquare size={16} />,
  SiTypescript: <SiTypescript size={16} />,
  SiRedux: <SiRedux size={16} />,
  SiVite: <SiVite size={16} />,
  FaNodeJs: <FaNodeJs size={16} />,
  SiMongodb: <SiMongodb size={16} />,
  SiMysql: <SiMysql size={16} />,
  SiPostgresql: <SiPostgresql size={16} />,
  SiFirebase: <SiFirebase size={16} />,
  FaDatabase: <FaDatabase size={16} />,
  SiPrisma: <SiPrisma size={16} />,
  FaPython: <FaPython size={16} />,
  FaJava: <FaJava size={16} />,
  FaGitAlt: <FaGitAlt size={16} />,
  FaGithub: <FaGithub size={16} />,
  FaDocker: <FaDocker size={16} />,
  SiIntellijidea: <SiIntellijidea size={16} />,
  SiPostman: <SiPostman size={16} />,
  FaTerminal: <FaTerminal size={16} />,
};

const renderSkillIcon = (skill: Skill) => {
  if (skill.iconType === "custom" && skill.iconUrl) {
    return (
      <Image
        src={skill.iconUrl}
        alt={skill.name}
        width={16}
        height={16}
        className="h-4 w-4 object-contain"
      />
    );
  }

  if (skill.iconType === "text") {
    return (
      <span
        className="flex h-4 w-4 items-center justify-center rounded-sm text-[9px] font-bold text-white"
        style={{ backgroundColor: skill.color || "#37b67c" }}
      >
        {skill.name.charAt(0).toUpperCase()}
      </span>
    );
  }

  if (skill.iconType === "react-icon" && skill.iconName) {
    return iconMap[skill.iconName] || <FaReact size={16} />;
  }

  return <FaReact size={16} />;
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
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const skillCategories = (
    Object.keys(skillsByCategory).length > 0 ? skillsByCategory : fallbackSkills
  ) as Record<string, SkillItem[]>;
  const categoryNames = Object.keys(skillCategories);
  const filterNames: Category[] = useMemo(() => ["All", ...categoryNames], [categoryNames]);
  const visibleCategories =
    activeCategory === "All" ? categoryNames : categoryNames.filter((c) => c === activeCategory);

  const getSkillMeta = (skill: SkillItem) => {
    const isDynamicSkill = "id" in skill;
    return {
      id: isDynamicSkill ? skill.id : skill.name,
      name: skill.name,
      icon: isDynamicSkill ? renderSkillIcon(skill) : skill.icon,
    };
  };

  if (loading) {
    return (
      <section
        id="skills"
        ref={ref}
        className="flex min-h-[40vh] flex-col items-center justify-center bg-background p-6"
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
    <section id="skills" ref={ref} className="relative bg-background py-24 sm:py-32">
      <div className="section-shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="section-heading"
          >
            Technical expertise
          </motion.h2>

          <div className="flex flex-wrap gap-5">
            {filterNames.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`border-b-2 pb-1 text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "border-primary text-foreground"
                    : "border-transparent text-foreground/50 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-12 divide-y divide-border border-t border-border"
        >
          {visibleCategories.map((category) => (
            <div
              key={category}
              className="grid gap-4 py-7 sm:grid-cols-[180px_1fr] sm:gap-8"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground/55">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {skillCategories[category].map((skill) => {
                  const meta = getSkillMeta(skill);
                  return (
                    <span key={meta.id} className="tag-chip inline-flex items-center gap-2">
                      <span className="text-foreground/60">{meta.icon}</span>
                      {meta.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
