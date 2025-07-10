"use client";
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

export default function Profile() {
  return (
    <section 
      id='home' 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8"
    >
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto"
        >
          <Image
            src="/profile-picture.jpeg"
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
            className="rounded-full shadow-2xl border-4 border-white dark:border-gray-700"
          />
        </motion.div>

        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Muhammad Awais Khan
          </h1>

          <TypeAnimation
            sequence={[
              'MERN Stack Developer',
              2000,
              'Computer Scientist',
              2000,
              'Full-Stack Enthusiast',
              2000,
              'Problem Solver',
              2000,
              'Tech Innovator',
              2000
            ]}
            wrapper="p"
            cursor={true}
            repeat={Infinity}
            className="text-xl sm:text-2xl font-semibold text-primary dark:text-primary-dark mt-2 h-8"
          />

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto md:mx-0">
            Passionate about creating web solutions that solve real-world problems. Let's build something great together!
          </p>

          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.05, y: -5 }}
            className="inline-block mt-8 px-8 py-3 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300"
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
