"use client";

import React from "react";
import { motion } from 'framer-motion';
import { FiLinkedin, FiGithub, FiMail } from 'react-icons/fi';

const ContactMe: React.FC = () => {
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 shadow-lg rounded-xl p-3 space-y-3 hidden sm:block">
      <motion.a
        href="https://www.linkedin.com/in/askhan963/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-110"
        title="LinkedIn"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiLinkedin className="w-6 h-6" />
      </motion.a>
      <motion.a
        href="https://github.com/askhan963"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-110"
        title="GitHub"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiGithub className="w-6 h-6" />
      </motion.a>
      <motion.a
        href="mailto:awaiskhanniazi963@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-110"
        title="Email"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiMail className="w-6 h-6" />
      </motion.a>
    </div>
  );
};

export default ContactMe;
