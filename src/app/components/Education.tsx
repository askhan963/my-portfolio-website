"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

const Education = () => {
    const educationData = [
      {
        institution: "COMSATS University Islamabad, Abbottabad Campus, KPK, Pakistan",
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
    <section id="education" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 p-6">
      <h1 className="text-5xl sm:text-6xl font-display font-bold text-gray-900 dark:text-gray-100 mb-16 tracking-tight">
        Education & Academic Journey
      </h1>

      <div className="max-w-4xl w-full">
        <ol className="relative border-s border-blue-200 dark:border-blue-700">
          {educationData.map((edu, index) => (
            <li key={index} className={`${index !== educationData.length - 1 ? 'mb-10' : ''} ms-6`}>
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 shadow-lg">
                <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
              </div>
              
              <time className="mb-1 text-sm font-normal leading-none text-blue-600 dark:text-blue-400 font-medium">
                {edu.period}
              </time>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] mt-2"
              >
                <div className="flex flex-col md:flex-row items-start">
                  {/* Logo Section */}
                  <div className="w-24 h-24 mr-0 md:mr-6 mb-4 md:mb-0 flex-shrink-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-20"></div>
                      <Image
                        src={edu.logo}
                        alt={`${edu.institution} Logo`}
                        width={96}
                        height={96}
                        className="relative rounded-full shadow-xl"
                      />
                    </div>
                  </div>

                  {/* Education Details */}
                  <div className="flex-grow">
                    <a href={edu.link} target="_blank" rel="noopener noreferrer" className="text-2xl sm:text-3xl font-heading font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
                      {edu.degree}
                    </a>
                    <p className="text-lg sm:text-xl font-heading font-medium text-gray-800 dark:text-gray-200 mt-1">
                      {edu.institution}
                    </p>

                    {/* CGPA */}
                    {edu.cgpa && (
                      <p className="text-sm sm:text-base font-body text-gray-700 dark:text-gray-300 mb-4 mt-2">
                        <span className="font-heading font-medium">CGPA:</span> {edu.cgpa}
                      </p>
                    )}

                    {/* Core Courses / Subjects */}
                    <div className="mt-4">
                      <p className="font-heading text-lg sm:text-xl font-medium mb-2 text-gray-900 dark:text-gray-100">
                        {edu.coreCourses ? "Core Courses" : "Core Subjects"}
                      </p>
                      <ul className="space-y-1 text-gray-600 dark:text-gray-400 list-disc pl-5 font-body">
                        {(edu.coreCourses || edu.coreSubjects)?.map((course, idx) => (
                          <li key={idx} className="text-sm sm:text-base">
                            {course}
                          </li>
                        ))}
                      </ul>
                    </div>
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