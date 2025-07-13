"use client";

import { FaHeart, FaCoffee } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-800 py-8 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center text-gray-600 dark:text-gray-400"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <span>Built with</span>
          <FaHeart className="text-red-500" />
          <span>and</span>
          <FaCoffee className="text-yellow-500" />
          <span>by</span>
          <span className="font-semibold text-primary dark:text-primary-dark">Awais Khan</span>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} Awais Khan. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
