"use client";

import { FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import { FiDownload, FiFileText } from "react-icons/fi";

const MyCVs = () => {
  const cvs = [
    {
      title: "Web Developer Resume",
      description:
        "A comprehensive resume detailing my skills and experience in web development.",
      downloadLink: "/CV/Awais_Khan_Resume.pdf",
    },
  ];

  return (
    <section
      id="my-cvs"
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center"
      >
        My Resume
      </motion.h1>

      <div className="max-w-2xl w-full">
        {cvs.map((cv, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
              <FiFileText className="text-primary dark:text-primary-dark" size={64} />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{cv.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{cv.description}</p>
            </div>
            <a
              href={cv.downloadLink}
              download
              className="mt-4 md:mt-0 md:ml-auto flex-shrink-0 inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300"
            >
              <FiDownload className="mr-2" />
              Download
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MyCVs;
