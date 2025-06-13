"use client";

import { FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";

const MyCVs = () => {
  const cvs = [
    {
      title: "Web Developer CV",
      description:
        "My professional resume highlighting my web development experience and skills.",
      downloadLink: "/CV/Awais_Khan_Resume.pdf",
      techStack: ["Web Development", "Full Stack", "Frontend", "Backend"],
      icon: FiDownload,
    },
    {
      title: "Technical CV",
      description:
        "My technical resume focused on software engineering and technical projects.",
      downloadLink: "/CV/Awais_Khan_Resume.pdf",
      techStack: [
        "Software Engineering",
        "Technical Skills",
        "Problem Solving",
      ],
      icon: FiDownload,
    },
  ];

  return (
    <section
      id="cv"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 p-6"
    >
      <h1 className="text-5xl sm:text-6xl font-display font-bold text-gray-900 dark:text-gray-100 mb-16 tracking-tight">
        My Resume
      </h1>

      <div className="space-y-8 max-w-4xl w-full">
        {cvs.map((cv, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-br from-white dark:from-gray-800/50 to-transparent dark:to-gray-700/50 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-blue-600 dark:text-teal-400 mb-3">
                  {cv.title}
                </h2>
              </div>
              <div className="flex items-center">
                <a
                  href={cv.downloadLink}
                  download
                  className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 dark:from-teal-500 dark:to-teal-600 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <FiDownload className="mr-2 text-lg" />
                  <span className="font-body">Download</span>
                </a>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-lg sm:text-xl font-body text-gray-700 dark:text-gray-300">
                {cv.description}
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                {cv.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-full text-sm font-body text-blue-600 dark:text-gray-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MyCVs;
