"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";

const honors = [
  {
    image: "/Awards/freeCodeCamp.png",
    title: "Relational Database",
    description: "freeCodeCamp",
  },
  {
    image: "/Awards/googleDSC.png",
    title: "Project Submission GDSC Solution Challenge 2024",
    description: "Google Developer Student Clubs",
  },
  {
    image: "/Awards/googleTop100.png",
    title: "Global Top 100 Finalist GDSC Solution Challenge 2024",
    description: "Google Developer Student Clubs",
  },
  {
    image: "/Awards/generativeAI.png",
    title: "Generative AI Fundamentals",
    description: "Google",
  },
];

export default function Honors() {
  return (
    <section
      id="honors"
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center"
      >
        Honors & Certifications
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {honors.map((honor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col items-center text-center p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="relative w-full h-48 mb-4">
              <Image
                src={honor.image}
                alt={honor.title}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{honor.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{honor.description}</p>
            <FiAward className="text-primary dark:text-primary-dark mt-4" size={24} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
