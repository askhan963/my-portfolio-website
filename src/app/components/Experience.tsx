"use client";

import Image from "next/image";
import { motion } from 'framer-motion';

export default function Experience() {
  const experiences = [
    {
      "title": "Senior Associate Software Engineer",
      "company": "Tech Avenue Pvt Ltd",
      "companyLink": "https://techavenue.biz/",
      "logo": "/Logos/tech-avenue.jpeg", // Replace with actual logo path
      "period": "Jan 2024 – Present | Onsite",
      "description": [
        "Developed and maintained full-stack web applications using the MERN stack (MongoDB, Express.js, React.js, and Node.js), ensuring robust performance and scalability.",
        "Built dynamic mobile applications with React Native, delivering high-quality user experiences across both iOS and Android platforms.",
        "Implemented state management using Redux and RTK for both web and mobile applications to streamline data flow and enhance performance.",
        "Collaborated with cross-functional teams to design and deliver modern, interactive user interfaces, ensuring seamless cross-platform compatibility.",
        // "Utilized Tailwind CSS for responsive, scalable, and visually appealing web designs, significantly improving user engagement and satisfaction."
      ]
    },
    {
      title: "React JS Developer",
      company: "Chromadesignhub",
      companyLink: "https://chromadesignhub.com/",
      logo: "/Logos/chroma.png", // Replace with actual logo path
      period: "Aug 2024 – December 2024 | Remote",
      description: [
        "Developed responsive front-end applications using React.js, with state management through Redux and RTK for efficient data handling and improved performance. ",
        "Collaborated with a team to deliver high-quality, interactive websites, enhancing user engagement and ensuring cross-platform compatibility. ",
        "Utilized Tailwind CSS to create scalable, modern designs that significantly boosted user satisfaction and overall user experience. ",
      ],
    },
    {
      title: "Freelance Web Developer",
      company: "Self-Employed",
      companyLink: "https://www.upwork.com/freelancers/~01ba14073aeac384ea", // No company link for freelance work
      logo: "/Logos/freelance.jpeg", // Replace with actual logo path
      period: "Feb 2023 – Present | Remote",
      description: [
        "Successfully completed over 10 full-stack projects using the MERN Stack, helping clients enhance productivity and streamline processes.",
        "Delivered custom CMS solutions and e-commerce platforms, integrating third-party services such as payment gateways for seamless transactions.",
        "Consistently received 5-star client ratings for high-quality work delivered within tight deadlines, resulting in a 30% increase in client business productivity.",
      ],
    },
    {
      title: " Web Development Lead",
      company:
        "Google Developer Student Club - GDSC CUI-ATD (COMSATS University) ",
      companyLink:
        "https://gdsc.community.dev/comsats-university-islamabad-abbottabad-pakistan/",
      logo: "/Logos/GDSC.png", // Replace with actual logo path
      period: "September 2023 –August 2024 | Onsite",
      description: [
        "Oversaw the creation of various websites throughout 2023-2024.",
        "Led and coordinated a team to successfully deliver multiple projects, demonstrating strong team management and coordination skills.",
        "Trained 25 students in web development, enhancing their practical skills and industry readiness.",
        "Member of a top 100 team in the GDSC Solution Challenge 2024, focusing on developing innovative tech solutions.",
      ],
    },
    {
      title: "STEM Writer - Java, C#, Python, C/C++",
      company: "EssayShark",
      companyLink: "https://assignmentshark.com/expert.html?id=askhan963",
      logo: "/Logos/Shark.jpg", // Replace with actual logo path
      period: "March 2023 - Present | Remote",
      description: [
        "Crafting detailed and accurate technical content for Java, C#, Python, and C/C++ projects.",
        "Consistently delivering high-quality documentation and guides, helping students and professionals enhance their coding skills and technical knowledge.",
        "Specialized in bridging the gap between complex programming concepts and practical applications.",
      ],
    },
  ];

  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6"
    >
      <h1 className="text-5xl sm:text-6xl font-display font-bold text-gray-900 dark:text-gray-100 mb-16 tracking-tight">
        Professional Experience
      </h1>

      <div className="max-w-5xl w-full">
        <ol className="relative border-s border-blue-200 dark:border-blue-700">
          {experiences.map((experience, index) => (
            <li key={index} className={`${index !== experiences.length - 1 ? 'mb-10' : ''} ms-6`}>
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 shadow-lg">
                <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
              </div>

              <time className="mb-1 text-sm font-normal leading-none text-blue-600 dark:text-blue-400 font-medium">
                {experience.period}
              </time>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800/50 p-6 sm:p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] mt-2"
              >
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  {/* Logo Section */}
                  <div className="w-16 h-16 flex-shrink-0 mx-auto sm:mx-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-20"></div>
                      <Image
                        src={experience.logo}
                        alt={`${experience.company} Logo`}
                        width={64}
                        height={64}
                        className="relative rounded-full shadow-xl"
                      />
                    </div>
                  </div>

                  {/* Experience Details */}
                  <div className="flex-1">
                    <a href={experience.companyLink} target="_blank" rel="noopener noreferrer" className="block">
                      <h2 className="text-2xl sm:text-3xl font-heading font-bold text-blue-600 dark:text-blue-400 mb-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
                        {experience.title}
                      </h2>
                      <p className="text-lg sm:text-xl font-heading font-medium text-gray-800 dark:text-gray-200 mb-1">
                        {experience.company}
                      </p>
                    </a>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400 list-disc pl-5 font-body mt-4">
                      {experience.description.map((desc, idx) => (
                        <li key={idx} className="text-sm sm:text-base">
                          {desc}
                        </li>
                      ))}
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
}