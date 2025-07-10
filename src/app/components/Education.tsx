"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa"; // Correct icon for education

const Education = () => {
  const educationData = [
    {
      institution: "COMSATS University Islamabad, Abbottabad Campus",
      degree: "BS Computer Science",
      period: "2020 - 2024",
      cgpa: "3.37",
      coreCourses: [
        "Data Structures & Algorithms",
        "Web Development",
        "Software Engineering",
        "Artificial Intelligence",
        "Machine Learning",
        "VR Development",
        "Database Systems",
        "Operating Systems",
      ],
      logo: "/Logos/COMSATS.jpg",
      link: "https://www.cuiatd.edu.pk/",
    },
    {
      institution: "MLWHS School Makerwal",
      degree: "Intermediate in Computer Science (ICS)",
      period: "2018 - 2020",
      coreSubjects: ["Physics", "Computer Science", "Mathematics"],
      logo: "/Logos/mlw.jpg",
      link: "https://m.facebook.com/MLWHSSM/?profile_tab_item_selected=about",
    },
  ];

  return (
    <section
      id="education"
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6 sm:p-12"
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-16 text-center"
      >
        Education & Academics
      </motion.h1>

      <div className="w-full max-w-4xl mx-auto">
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          {educationData.map((edu, index) => (
            <li key={index} className="mb-12 ms-8">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full -start-4 ring-8 ring-white dark:bg-indigo-900 dark:ring-gray-900">
                <FaGraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </span>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-transparent dark:border-gray-700/50"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Image
                    src={edu.logo}
                    alt={`${edu.institution} Logo`}
                    width={56}
                    height={56}
                    className="rounded-lg shadow-sm flex-shrink-0"
                  />
                  <div className="flex-1">
                    <a
                      href={edu.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        {edu.institution}
                      </h3>
                    </a>
                    <p className="text-md font-semibold text-gray-700 dark:text-gray-300">
                      {edu.degree}
                    </p>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500 mt-1">
                      {edu.period}
                    </time>
                  </div>
                </div>

                <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                  {edu.cgpa && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Final CGPA:
                      </span>{" "}
                      {edu.cgpa} / 4.0
                    </p>
                  )}
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {edu.coreCourses ? "Core Courses" : "Core Subjects"}
                    </h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400 list-disc pl-5">
                      {(edu.coreCourses || edu.coreSubjects)?.map(
                        (item, idx) => (
                          <li
                            key={idx}
                            className="text-sm sm:text-base leading-relaxed"
                          >
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Education;