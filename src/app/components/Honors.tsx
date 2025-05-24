"use client";

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiExternalLink } from 'react-icons/fi';

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
  {
    image: "/Awards/simplilearn.png",
    title: "Introduction to Front End Development",
    description: "Simplilearn",
  },
  {
    image: "/Awards/futureTech.png",
    title: "Certificate of Appreciation",
    description: "Future Tech",
  },
  {
    image: "/Awards/gitGithubParticipation.png",
    title: "Certificate of Participation in Git & GitHub for Developers",
    description: "GitHub",
  },
  {
    image: "/Awards/IntroductionToAI.png",
    title: "Certificate of Introduction to AI & ML using Cloud",
    description: "Google",
  },
  {
    image: "/Awards/IntroToMERN.png",
    title: "Certificate of Introduction to MERN Stack",
    description: "Google",
  },
  {
    image: "/Awards/IntroToGenAI.png",
    title: "Certificate of Intro to Gen AI Studio",
    description: "Google",
  }
];

export default function Honors() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Trigger animation once when the section comes into view

  return (
    <section id='honors'
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 p-6"
    >
      <h1 className="text-5xl sm:text-6xl font-display font-bold text-gray-900 dark:text-gray-100 mb-16 tracking-tight">
        Honors & Certifications
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {honors.map((honor, index) => (
          <motion.div
            key={index}
            className="relative group overflow-hidden rounded-xl shadow-lg bg-gradient-to-br from-gray-50 dark:from-gray-800/50 to-transparent dark:to-gray-700/50 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -5 }}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Certification Image */}
            <div className="relative w-full h-[350px] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-10"></div>
              <Image
                src={honor.image}
                alt={honor.title}
                width={350}
                height={350}
                className="object-cover rounded-xl"
              />
            </div>

            {/* Title Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/80 to-transparent rounded-xl p-6"
            >
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white text-center mb-2">
                {honor.title}
              </h2>
              <p className="text-sm font-body text-white/80 mb-4">
                {honor.description}
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-white/80"
              >
                <FiExternalLink size={20} />
                <span className="text-sm font-body">View Certificate</span>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
