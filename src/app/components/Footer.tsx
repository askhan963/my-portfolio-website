"use client";

import { FaHeart, FaCoffee } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-[200px] flex items-center justify-center py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 px-4 py-6 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-wrap items-center justify-center text-gray-700 dark:text-gray-300 text-base sm:text-lg"
          >
            <span className="mr-2">Built with</span>
            <FaHeart className="text-red-600 dark:text-red-400 mx-2 hover:scale-110 transition-transform" />
            <span className="mx-2">and</span>
            <FaCoffee className="text-yellow-600 dark:text-yellow-400 mx-2 hover:scale-110 transition-transform" />
            <span>by</span>
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="ml-2 font-semibold text-blue-500 dark:text-teal-400 hover:text-blue-600 dark:hover:text-teal-300 transition-colors"
            >
              Awais Khan
            </motion.span>
          </motion.div>

          {/* Optional social icons section (uncomment if needed)
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex items-center justify-center gap-4 text-gray-600 dark:text-gray-400 mt-4 md:mt-0"
  >
    <a
      href="https://github.com/askhan963"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-500 dark:hover:text-teal-300 transition-colors"
    >
      <span className="sr-only">GitHub</span>
      <motion.div
        whileHover={{ rotate: 5 }}
        className="i-simple-icons-github text-2xl"
      />
    </a>
    <a
      href="https://linkedin.com/in/askhan963"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-500 dark:hover:text-teal-300 transition-colors"
    >
      <span className="sr-only">LinkedIn</span>
      <motion.div
        whileHover={{ rotate: 5 }}
        className="i-simple-icons-linkedin text-2xl"
      />
    </a>
  </motion.div>
  */}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm"
        >
          © {new Date().getFullYear()} Awais Khan. All rights reserved.
        </motion.p>
      </motion.div>
    </footer>
  );
};

export default Footer;
