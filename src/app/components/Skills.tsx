"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaGitAlt, FaDocker, FaJava, FaPython, FaHtml5, FaCss3, FaGithub, FaJsSquare, FaDatabase, FaTerminal } from "react-icons/fa";
import { SiMongodb, SiRedux, SiTailwindcss, SiTypescript, SiIntellijidea, SiMysql, SiFirebase, SiGraphql, SiPostgresql, SiPostman, SiPrisma, SiVite } from "react-icons/si";
import { useSkills, Skill } from "@/hooks/useSkills";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Image from "next/image";

type Category = "Frontend" | "Backend" | "Languages" | "Tools";

// Fallback skills data
const fallbackSkills: Record<Category, { name: string; icon: JSX.Element }[]> = {
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

// Icon mapping for dynamic rendering
const iconMap: Record<string, JSX.Element> = {
  'FaReact': <FaReact size={40} />,
  'SiTailwindcss': <SiTailwindcss size={40} />,
  'FaHtml5': <FaHtml5 size={40} />,
  'FaCss3': <FaCss3 size={40} />,
  'FaJsSquare': <FaJsSquare size={40} />,
  'SiTypescript': <SiTypescript size={40} />,
  'SiRedux': <SiRedux size={40} />,
  'SiVite': <SiVite size={40} />,
  'FaNodeJs': <FaNodeJs size={40} />,
  'SiMongodb': <SiMongodb size={40} />,
  'SiMysql': <SiMysql size={40} />,
  'SiPostgresql': <SiPostgresql size={40} />,
  'SiFirebase': <SiFirebase size={40} />,
  'FaDatabase': <FaDatabase size={40} />,
  'SiPrisma': <SiPrisma size={40} />,
  'FaPython': <FaPython size={40} />,
  'FaJava': <FaJava size={40} />,
  'FaGitAlt': <FaGitAlt size={40} />,
  'FaGithub': <FaGithub size={40} />,
  'FaDocker': <FaDocker size={40} />,
  'SiIntellijidea': <SiIntellijidea size={40} />,
  'SiPostman': <SiPostman size={40} />,
  'FaTerminal': <FaTerminal size={40} />,
};

// Helper function to render skill icon
const renderSkillIcon = (skill: Skill) => {
  if (skill.iconType === 'custom' && skill.iconUrl) {
    return (
      <Image
        src={skill.iconUrl}
        alt={skill.name}
        width={40}
        height={40}
        className="w-10 h-10 object-contain"
      />
    );
  }
  
  if (skill.iconType === 'text') {
    return (
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
        style={{ backgroundColor: skill.color || '#3B82F6' }}
      >
        {skill.name.charAt(0).toUpperCase()}
      </div>
    );
  }
  
  if (skill.iconType === 'react-icon' && skill.iconName) {
    return iconMap[skill.iconName] || <FaReact size={40} />;
  }
  
  return <FaReact size={40} />;
};

import { useInView } from "react-intersection-observer";

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '200px 0px' });
  const { skills, loading, error } = useSkills({ enabled: inView });
  const [activeCategory, setActiveCategory] = useState<Category>("Frontend");

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category as Category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<Category, Skill[]>);

  // Use dynamic skills or fallback
  const skillCategories = Object.keys(skillsByCategory).length > 0 
    ? skillsByCategory 
    : fallbackSkills;

  if (loading) {
    return (
      <section
        id="skills"
        ref={ref}
        className="min-h-screen flex flex-col items-center justify-center bg-background p-6"
      >
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-foreground/70">Loading skills...</p>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Error loading skills:', error);
  }

  return (
    <section
      id="skills"
      ref={ref}
      className="relative overflow-hidden bg-background py-24 sm:py-32"
    >
      <div className="section-shell">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="section-heading mb-12"
      >
        Tech Stack
      </motion.h1>

      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {Object.keys(skillCategories).map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category as Category)}
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
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
        >
          {skillCategories[activeCategory]?.map((skill, index) => {
            const isDynamicSkill = 'id' in skill;
            const skillName = isDynamicSkill ? skill.name : skill.name;
            const skillIcon = isDynamicSkill ? renderSkillIcon(skill as Skill) : skill.icon;
            
            return (
              <motion.div
                key={isDynamicSkill ? (skill as Skill).id : skillName}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex aspect-[0.86] flex-col items-center justify-center border border-border bg-card p-4 text-card-foreground backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-primary/70 hover:bg-primary/10 hover:shadow-[0_16px_45px_rgba(194,164,255,0.18)]"
              >
                <div className="mb-3 text-primary grayscale transition-all duration-300 group-hover:grayscale-0">
                  {skillIcon}
                </div>
                <span className="text-center text-sm font-medium text-foreground">
                  {skillName}
                </span>
                {isDynamicSkill && (skill as Skill).proficiency && (
                  <span className="text-xs text-foreground/60 mt-1">
                    {(skill as Skill).proficiency!.charAt(0).toUpperCase() + (skill as Skill).proficiency!.slice(1)}
                  </span>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      </div>
    </section>
  );
}
