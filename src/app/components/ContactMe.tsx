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
      className="fixed bottom-6 left-[max(1rem,calc((100vw-1280px)/2))] z-40 hidden flex-col items-center gap-5 sm:flex"
    >
      <motion.a
        href="https://www.linkedin.com/in/askhan963/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="flex h-11 w-11 items-center justify-center border border-border bg-card text-card-foreground backdrop-blur transition-colors duration-300 hover:border-primary hover:text-primary"
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
        className="flex h-11 w-11 items-center justify-center border border-border bg-card text-card-foreground backdrop-blur transition-colors duration-300 hover:border-primary hover:text-primary"
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
        className="flex h-11 w-11 items-center justify-center border border-border bg-card text-card-foreground backdrop-blur transition-colors duration-300 hover:border-primary hover:text-primary"
        title="Email"
      >
        <FiMail className="w-6 h-6" />
      </motion.a>
    </motion.div>
  );
};

export default ContactMe;
