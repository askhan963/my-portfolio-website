"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, FaNodeJs, FaGitAlt, FaDocker, FaJava, FaPython, FaHtml5, FaCss3, FaGithub, 
   FaJsSquare, FaDatabase,
} from 'react-icons/fa';
import { 
  SiMongodb, SiRedux, SiTailwindcss, SiTypescript, SiIntellijidea, SiCsharp, 
  SiMysql, SiFirebase, SiGraphql, SiPostgresql 
} from 'react-icons/si';

type Category = 'Frontend' | 'Backend' | 'Languages' | 'Tools';

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
  ],
  Backend: [
    { name: "Node.js", icon: <FaNodeJs size={40} /> },
    { name: "Express.js", icon: <FaNodeJs size={40} /> },
    { name: "MongoDB", icon: <SiMongodb size={40} /> },
    { name: "MySQL", icon: <SiMysql size={40} /> },
    { name: "PostgreSQL", icon: <SiPostgresql size={40} /> },
    { name: "Firebase", icon: <SiFirebase size={40} /> },
    { name: "GraphQL", icon: <SiGraphql size={40} /> },
    { name: "RESTful APIs", icon: <FaDatabase size={40} /> },
  ],
  Languages: [
    { name: "JavaScript", icon: <FaJsSquare size={40} /> },
    { name: "TypeScript", icon: <SiTypescript size={40} /> },
    { name: "Python", icon: <FaPython size={40} /> },
    { name: "Java", icon: <FaJava size={40} /> },
    { name: "C#", icon: <SiCsharp size={40} /> },
  ],
  Tools: [
    // { name: "VS Code", icon: <FaVisualStudio size={40} /> },
    { name: "Git", icon: <FaGitAlt size={40} /> },
    { name: "GitHub", icon: <FaGithub size={40} /> },
    { name: "Docker", icon: <FaDocker size={40} /> },
    { name: "IntelliJ IDEA", icon: <SiIntellijidea size={40} /> },
  ],
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<Category>("Frontend");

  return (
    <section id='skills' className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 p-6">
      <h1 className="text-5xl sm:text-6xl font-display font-bold text-gray-800 dark:text-gray-100 mb-16 tracking-tight">
        Skills & Expertise
      </h1>

      <div className="flex w-full max-w-6xl">
        {/* Vertical Category Buttons on the Left */}
        <div className="w-1/4 flex flex-col space-y-4">
          {Object.keys(skillCategories).map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category as Category)}
              className={`text-sm md:text-lg font-heading font-semibold px-4 py-3 rounded-lg transition-all duration-300 text-start ${
                activeCategory === category
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                  : "bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300"
              } hover:bg-gray-100 dark:hover:bg-gray-700/70 hover:shadow-md`}
            >
              <span className="text-sm md:text-lg">{category}</span>
            </motion.button>
          ))}
        </div>

        {/* Skills Display on the Right */}
        <div className="w-3/4 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 p-4">
          {skillCategories[activeCategory].map((skill) => (
            <motion.div
              key={skill.name}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col items-center relative group"
            >
              <div className="relative group">
                {/* Skill Icon */}
                <div className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  {skill.icon}
                </div>
                {/* Skill Name on Hover */}
                <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-body px-4 py-2 rounded-lg -bottom-12 left-1/2 transform -translate-x-1/2 shadow-md">
                  {skill.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
