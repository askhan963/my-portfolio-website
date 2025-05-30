"use client";

import { useState } from "react";
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
  SiGraphql,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiVite,
} from "react-icons/si";

type Category = "Frontend" | "Backend" | "Languages" | "Tools";

interface Skill {
  name: string;
  icon: JSX.Element;
}

const skillCategories: Record<Category, Skill[]> = {
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
    // { name: "GraphQL", icon: <SiGraphql size={40} /> },
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
    // { name: "VS Code", icon: <SiVisualstudiocode size={40} /> },
    { name: "IntelliJ IDEA", icon: <SiIntellijidea size={40} /> },
    { name: "Postman", icon: <SiPostman size={40} /> },
    { name: "Terminal", icon: <FaTerminal size={40} /> },
  ],
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<Category>("Frontend");

  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 p-6"
    >
      <h1 className="text-5xl sm:text-6xl font-display font-bold text-gray-800 dark:text-gray-100 mb-16 tracking-tight">
        Skills & Expertise
      </h1>

      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-10">
        {/* Sidebar */}
        <div className="md:w-1/4 flex md:flex-col justify-center md:items-start items-center gap-4">
          {Object.keys(skillCategories).map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category as Category)}
              className={`w-full text-center md:text-left px-4 py-2 rounded-lg text-base font-medium transition-all ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Skills */}
        <div className="md:w-3/4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {skillCategories[activeCategory].map((skill) => (
            <motion.div
              key={skill.name}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex flex-col items-center"
            >
              <div className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-xl transition-shadow">
                {skill.icon}
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-200 text-center">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
