"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaGitAlt, FaDocker, FaJava, FaPython, FaHtml5, FaCss3, FaGithub, FaJsSquare, FaDatabase, FaTerminal } from "react-icons/fa";
import { SiMongodb, SiRedux, SiTailwindcss, SiTypescript, SiIntellijidea, SiMysql, SiFirebase, SiGraphql, SiPostgresql, SiPostman, SiPrisma, SiVite } from "react-icons/si";

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

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<Category>("Frontend");

  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6"
    >
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center"
      >
        Skills & Expertise
      </motion.h1>

      <div className="w-full max-w-6xl mx-auto">
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {Object.keys(skillCategories).map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category as Category)}
              className={`px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
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
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
        >
          {skillCategories[activeCategory].map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-primary dark:text-primary-dark mb-3">
                {skill.icon}
              </div>
              <span className="text-md font-medium text-gray-700 dark:text-gray-200 text-center">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
