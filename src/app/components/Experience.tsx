"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaBriefcase, FaArrowUp } from "react-icons/fa"; // Added FaArrowUp for the promotion icon

export default function Experience() {
  const experiences = [
    {
      company: "Tech Avenue Pvt Ltd",
      companyLink: "https://techavenue.biz/",
      logo: "/Logos/tech-avenue.jpeg",
      // The overall period you've been with the company
      period: "Jan 2024 – Present | Onsite",
      roles: [
        {
          title: "Software Engineer",
          period: "April 2024 – Present",
          description: [
            "Promoted from Senior Associate to Software Engineer in recognition of consistent performance and delivery.",
            "Leading complex full-stack development projects using the MERN stack with a focus on scalability and maintainability.",
            "Mentoring junior developers and reviewing code to ensure adherence to best practices.",
            "Contributing to architectural decisions and long-term technical planning with cross-functional teams.",
          ],
        },
        {
          title: "Senior Associate Software Engineer",
          period: "January 2024 – March 2024",
          description: [
            "Developed and maintained full-stack web applications using the MERN stack, ensuring robust performance and scalability.",
            "Built dynamic mobile applications with React Native, delivering high-quality user experiences across both iOS and Android platforms.",
            "Implemented state management using Redux and RTK to streamline data flow and enhance performance.",
            "Collaborated with cross-functional teams to design and deliver modern, interactive user interfaces.",
          ],
        },
      ],
    },
  {
      title: "Front-End Developer",
      company: "WEBSTERS",
      companyLink: "https://websterstech.com/",
      logo: "/Logos/WEBSTERS.png", // Replace with actual logo path
      period: "September 2024 – December 2024 | Remote",
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
      logo: "/Logos/freelance.png", // Replace with actual logo path
      period: "Febuary 2023 – Present | Remote",
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
      className="min-h-screen flex flex-col items-center justify-center bg-background p-6 sm:p-12"
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl font-bold text-foreground mb-16 text-center"
      >
        Professional Experience
      </motion.h1>

      <div className="w-full max-w-4xl mx-auto">
        <ol className="relative border-s border-border">
          {experiences.map((experience, index) => (
            <li key={index} className="mb-12 ms-8">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-primary/15 rounded-full -start-4 ring-8 ring-card">
                <FaBriefcase className="w-4 h-4 text-primary" />
              </span>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-6 bg-card text-card-foreground rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-border"
              >
                {/* Shared Company Header */}
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Image
                    src={experience.logo}
                    alt={`${experience.company} Logo`}
                    width={56}
                    height={56}
                    className="rounded-lg shadow-sm flex-shrink-0"
                  />
                  <div className="flex-1">
                    <a
                      href={experience.companyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <h3 className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                        {experience.company}
                      </h3>
                    </a>
                    <time className="block mb-2 text-sm font-normal leading-none text-foreground/60 mt-1">
                      {experience.period}
                    </time>
                  </div>
                </div>

                {/* Conditional Rendering for Roles */}
                {experience.roles ? (
                  <div className="mt-4 space-y-6">
                    {experience.roles.map((role, roleIndex) => (
                      <div key={role.title}>
                        {/* Promotion Separator */}
                        {roleIndex < experience.roles.length - 1 && roleIndex !== 0 && (
                          <div className="flex items-center text-center my-6">
                            <div className="flex-grow border-t border-border"></div>
                            <span className="flex-shrink mx-4 inline-flex items-center gap-2 text-xs font-semibold uppercase text-primary">
                              <FaArrowUp />
                              Promotion
                            </span>
                            <div className="flex-grow border-t border-border"></div>
                          </div>
                        )}

                        {/* Role Details */}
                        <div>
                          <h4 className="text-lg font-semibold text-foreground">{role.title}</h4>
                          <time className="block mb-2 text-xs font-normal text-foreground/60">{role.period}</time>
                          <ul className="mt-2 space-y-2 text-foreground/70 list-disc pl-5">
                            {role.description.map((desc, idx) => (
                              <li key={idx} className="text-sm sm:text-base leading-relaxed">
                                {desc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Fallback for single-role experiences
                  <div className="mt-2">
                     <h3 className="text-xl font-bold text-foreground">{experience.title}</h3>
                    <ul className="mt-2 space-y-2 text-foreground/70 list-disc pl-5">
                      {experience.description.map((desc, idx) => (
                        <li key={idx} className="text-sm sm:text-base leading-relaxed">
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}