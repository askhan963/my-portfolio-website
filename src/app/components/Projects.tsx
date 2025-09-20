"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { useProjects, Project as ProjectType } from "@/hooks/useProjects";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Projects() {
  const { projects, loading, error } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Get unique categories from API data
  const categories = useMemo(() => {
    if (!projects || projects.length === 0) return ["All"];
    const uniqueCategories = [...new Set(projects.map(project => project.category))];
    return ["All", ...uniqueCategories];
  }, [projects]);

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return selectedCategory === "All" 
      ? projects 
      : projects.filter(project => project.category === selectedCategory);
  }, [projects, selectedCategory]);

  // Loading state
  if (loading) {
    return (
      <section
        id="projects"
        className="min-h-screen flex flex-col items-center justify-center bg-background p-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-foreground mb-12 text-center"
        >
          My Projects
        </motion.h1>
        <div className="flex flex-col items-center justify-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-foreground/60">Loading projects...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section
        id="projects"
        className="min-h-screen flex flex-col items-center justify-center bg-background p-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-foreground mb-12 text-center"
        >
          My Projects
        </motion.h1>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-foreground/60 mb-4">Failed to load projects</p>
          <p className="text-sm text-foreground/40">{error}</p>
        </div>
      </section>
    );
  }

  // Empty state
  if (!projects || projects.length === 0) {
    return (
      <section
        id="projects"
        className="min-h-screen flex flex-col items-center justify-center bg-background p-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-foreground mb-12 text-center"
        >
          My Projects
        </motion.h1>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-foreground/40 text-xl mb-4">🚀</div>
          <p className="text-foreground/60">No projects available at the moment</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col items-center justify-center bg-background p-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl font-bold text-foreground mb-12 text-center"
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
                  : "bg-card text-card-foreground border border-border hover:bg-primary/10"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="space-y-12 max-w-6xl w-full">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card text-card-foreground p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-8 border border-border"
            >
              <div className="lg:w-1/2 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-3">
                  {project.title}
                </h2>
                <p className="text-lg sm:text-xl font-body text-foreground/70">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-background rounded-full text-sm font-body text-primary border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.awards && project.awards.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Awards & Recognition:</h4>
                    <ul className="space-y-1">
                      {project.awards.map((award, idx) => (
                        <li key={idx} className="text-sm text-foreground/70 flex items-center">
                          <span className="text-primary mr-2">🏆</span>
                          {award}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex space-x-4 mt-6">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl text-primary hover:text-opacity-80 transition-colors duration-300"
                    >
                      <FiGithub />
                    </a>
                  )}
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl text-primary hover:text-opacity-80 transition-colors duration-300"
                    >
                      <FiExternalLink />
                    </a>
                  )}
                </div>
              </div>

              <div className="lg:w-1/2 w-full">
                <Swiper
                  modules={[Pagination, Navigation, Autoplay]}
                  pagination={{ clickable: true }}
                  navigation={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  loop={true}
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


