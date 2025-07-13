"use client";

import React from "react";
import { motion } from 'framer-motion';
import { FiLinkedin, FiGithub, FiMail } from 'react-icons/fi';

const ContactMe: React.FC = () => {
  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 1, ease: "easeOut" }}
      className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 hidden sm:flex flex-col items-center space-y-4"
    >
      <motion.a
        href="https://www.linkedin.com/in/askhan963/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark transition-colors duration-300"
        title="LinkedIn"
      >
        <FiLinkedin className="w-6 h-6" />
      </motion.a>
      <motion.a
        href="https://github.com/askhan963"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark transition-colors duration-300"
        title="GitHub"
      >
        <FiGithub className="w-6 h-6" />
      </motion.a>
      <motion.a
        href="mailto:awaiskhanniazi963@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark transition-colors duration-300"
        title="Email"
      >
        <FiMail className="w-6 h-6" />
      </motion.a>
    </motion.div>
  );
};

export default ContactMe;
