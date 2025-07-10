"use client";

import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

interface ProjectCategory {
  category: string;
  projects: Project[];
}

interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubLink?: string;
  liveLink?: string;
  images: string[];
  awards?: string[];
}

const projects: ProjectCategory[] = [
  {
    category: "Computer Sciecne",
    projects: [
      {
        title: "VR MathQuest Adventures (FYP)",
        description:
          "VR MathQuest Adventures is an innovative Virtual Reality application designed to enhance learning through immersive interactive environments. Developed as part of a capstone project, this application leverages the power of VR to teach basic arithmetic concepts to children via engaging games like Basket-Hop and Bow & Arrow. By integrating real-time interaction and feedback, the app ensures that learners not only grasp but also retain mathematical principles more effectively.",
        techStack: ["Unity", "OpenXR", "C#"],
        awards: ["Received an Appreciation Award at COMPEC NUST 2024"],
        images: [
          "/Projects/math-quest/1.png",
          "/Projects/math-quest/2.png",
          "/Projects/math-quest/3.png",
          "/Projects/math-quest/4.png",
          "/Projects/math-quest/5.png",
          "/Projects/math-quest/6.png",
          "/Projects/math-quest/7.png",
        ],
      },
      {
        title: "AgriTech: An AI-Powered Solution for Sustainable Agriculture",
        description:
          "AgriTech is dedicated to combating crop diseases in Pakistan, using advanced AI to enhance agricultural productivity and sustainability.",
        techStack: [
          "Google COLAB",
          "TensorFlow",
          "Flutter",
          "Firebase",
          "Debian OS",
          "Thonny",
        ],
        awards: ["Google Solution Challenger 2023-2024 Top 100 Winner"],
        githubLink: "https://github.com/GDSC-cuiatd/AgriTech",
        images: [
          "/Projects/agritech/0.png",
          "/Projects/agritech/1.png",
          "/Projects/agritech/2.png",
          "/Projects/agritech/3.png",
          "/Projects/agritech/4.png",
          "/Projects/agritech/5.png",
          "/Projects/agritech/6.png",
        ],
      },
    ],
  },
  {
    category: "MERN Stack",
    projects: [
      {
        title: "BookShelfX",
        description:
          "BookShelfX is a dynamic web application for managing a collection of books. It provides a seamless experience for users to browse, add, and manage books in their library.",
        techStack: [
          "React",
          "Tailwind CSS",
          "Redux Toolkit",
          "Node.js",
          "MongoDB",
          "Firebase",
        ],
        githubLink: "https://github.com/askhan963/bookShelfX",
        liveLink: "https://bookshelfx.netlify.app",
        images: [
          "/Projects/bookshelfx/1.png",
          "/Projects/bookshelfx/2.png",
          "/Projects/bookshelfx/3.png",
          "/Projects/bookshelfx/4.png",
          "/Projects/bookshelfx/5.png",
          "/Projects/bookshelfx/6.png",
          "/Projects/bookshelfx/7.png",
          "/Projects/bookshelfx/8.png",
          "/Projects/bookshelfx/9.png",
          "/Projects/bookshelfx/10.png",
          "/Projects/bookshelfx/11.png",
        ],
      },
      {
        title: "Netflix Clone",
        description:
          "A Netflix clone developed using the MERN stack. It includes features such as user authentication, a main page showcasing available content, and team information.",
        techStack: ["React", "Redux", "Node.js", "MongoDB", "Firebase"],
        githubLink: "https://github.com/askhan963/netflix-clone-mern",
        liveLink: "https://adorable-biscochitos-00323b.netlify.app/",
        images: [
          "/Projects/netflix-clone/1.png",
          "/Projects/netflix-clone/2.png",
          "/Projects/netflix-clone/3.png",
          "/Projects/netflix-clone/4.png",
          "/Projects/netflix-clone/5.png",
        ],
      },
      {
        title: "Clean Slate",
        description:
          "CleanSlate is a free, user-friendly image background remover that delivers high-quality results with just a few clicks.",
        techStack: ["React", "Tailwind CSS", "Node.js", "Clerk", "MongoDB"],
        githubLink: "https://github.com/askhan963/CleanSlate",
        liveLink: "https://cleanslate.netlify.app/",
        images: [
          "/Projects/cleanslate/1.png",
          "/Projects/cleanslate/2.png",
          "/Projects/cleanslate/3.png",
          "/Projects/cleanslate/4.png",
          "/Projects/cleanslate/5.png",
          "/Projects/cleanslate/6.png",
        ],
      },
      {
        title: "E-Commerce Platform",
        description:
          "A fully functional e-commerce platform built with React.js, Redux, and TailwindCSS for the frontend and Express.js for the backend.",
        techStack: ["React", "Redux", "Node.js", "MongoDB", "Tailwind CSS"],
        githubLink: "https://github.com/askhan963/emcomerce-platform",
        liveLink: "https://www.youtube.com/watch?v=FNIzKc1O4-M",
        images: [
          "/Projects/e-com-p/1.png",
          "/Projects/e-com-p/2.png",
          "/Projects/e-com-p/3.png",
          "/Projects/e-com-p/4.png",
        ],
      },
      {
        title: "Dream Minder",
        description:
          "Dream Minder is a MERN stack-based goal setting and productivity app, allowing users to manage, track, and collaborate on personal and professional goals.",
        techStack: [
          "React",
          "Node.js",
          "MongoDB",
          "Tailwind CSS",
          "TypeScript",
        ],
        githubLink: "https://github.com/askhan963/DreamMinder",
        liveLink: "https://dreamminder.netlify.app/",
        images: [
          "/Projects/dream-minder/1.png",
          "/Projects/dream-minder/2.png",
          "/Projects/dream-minder/3.png",
          "/Projects/dream-minder/4.png",
        ],
      },
      {
        title: "URL Shortener Service",
        description:
          "A full-stack URL shortener service built using Node.js, TypeScript, Express, MongoDB for the backend, and React with Vite for the frontend.",
        techStack: [
          "React",
          "Node.js",
          "MongoDB",
          "TypeScript",
          "Tailwind CSS",
        ],
        githubLink: "https://github.com/askhan963/url-shortener-mern",
        liveLink: "https://url-shortener-askhan.netlify.app/",
        images: [
          "/Projects/url-shortner/1.png",
          "/Projects/url-shortner/2.png",
          "/Projects/url-shortner/3.png",
          "/Projects/url-shortner/4.png",
          "/Projects/url-shortner/5.png",
          "/Projects/url-shortner/6.png",
          "/Projects/url-shortner/7.png",
          "/Projects/url-shortner/8.png",
        ],
      },
      {
        title: "My Personal Portfolio",
        description:
          "This project showcases my skills, experience, projects, and more. Built with modern web technologies for an engaging, responsive experience.",
        techStack: [
          "Next.js",
          "React",
          "Tailwind CSS",
          "TypeScript",
          "Framer Motion",
        ],
        githubLink: "https://github.com/askhan963/my-portfolio-website",
        liveLink: "https://awaiskhanniazi.netlify.app/",
        images: [
          "/Projects/my-portfolio/1.png",
          "/Projects/my-portfolio/2.png",
          "/Projects/my-portfolio/3.png",
          "/Projects/my-portfolio/4.png",
          "/Projects/my-portfolio/5.png",
          "/Projects/my-portfolio/6.png",
        ],
      },
      {
        title: "GPA and CGPA Calculator",
        description:
          "A web application that helps students calculate their GPA and CGPA with a responsive and intuitive user interface.",
        techStack: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
        githubLink: "https://github.com/askhan963/comsats-cgpa-calculater",
        liveLink: "https://comsats-cgpa-calculater.vercel.app/",
        images: [
          "/Projects/cgpa-cal/1.png",
          "/Projects/cgpa-cal/2.png",
          "/Projects/cgpa-cal/3.png",
          "/Projects/cgpa-cal/4.png",
          "/Projects/cgpa-cal/5.png",
        ],
      },
    ],
  },
  {
    category: "React Native",
    projects: [
      {
        title: "Installment Management System (IMS)",
        description:
          "A React Native application to assist users in managing their installments, allowing them to schedule, view, and keep track of various payments.",
        techStack: ["React Native", "React Navigation", "React Native Paper"],
        githubLink:
          "https://github.com/askhan963/installments-management-system",
        liveLink: "https://www.youtube.com/shorts/6tMjFW5JxcA",
        images: ["/Projects/installment-management-image.png"],
      },
      {
        title: "Intro Social App using React Native",
        description:
          "A semester project using React Native, providing basic chat functionality with Firebase, profile customization, and post creation.",
        techStack: ["React Native", "Firebase", "React Navigation"],
        githubLink: "https://github.com/askhan963/social-app",
        images: ["/Projects/social-chat-app-image.png"],
      },
    ],
  },
];

const categories = [
  "All",
  ...projects.map((projectCategory) => projectCategory.category),
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects.flatMap((category) => category.projects)
      : projects.find((category) => category.category === selectedCategory)
          ?.projects || [];

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center"
      >
        My Projects
      </motion.h1>

      <div className="w-full max-w-6xl mx-auto">
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="space-y-12 max-w-6xl w-full">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800/50 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-8"
            >
              <div className="lg:w-1/2 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary dark:text-primary-dark mb-3">
                  {project.title}
                </h2>
                <p className="text-lg sm:text-xl font-body text-gray-700 dark:text-gray-300">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-body text-primary dark:text-primary-dark"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4 mt-6">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl text-primary dark:text-primary-dark hover:text-opacity-80 transition-colors duration-300"
                    >
                      <FiGithub />
                    </a>
                  )}
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl text-primary dark:text-primary-dark hover:text-opacity-80 transition-colors duration-300"
                    >
                      <FiExternalLink />
                    </a>
                  )}
                </div>
              </div>

              <div className="lg:w-1/2 w-full">
                <Swiper
                  modules={[Pagination, Navigation]}
                  pagination={{ clickable: true }}
                  navigation={true}
                  className="rounded-lg shadow-lg w-full max-w-full"
                >
                  {project.images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full h-80 rounded-lg overflow-hidden"
                      >
                        <Image
                          src={img}
                          alt={`${project.title} Image ${idx + 1}`}
                          fill
                          className="rounded-lg object-cover transition duration-300 hover:scale-105"
                        />
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


