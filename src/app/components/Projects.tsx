"use client";

import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
  title: string;
  description: string;
  tags: string[];
  githubLink: string;
  liveLink: string;
  image: string;
}



const projects: Project[] = [
  {
    title: "E-Commerce Platform (MERN Stack)",
    description:
      "Developed a fully functional e-commerce platform using React.js, Redux, and Tailwind CSS for the frontend, and Express.js for the backend. Features include product listing, detailed product information, cart management, a multi-step checkout process, user authentication using JWT, and responsive design.",
    tags: ["React.js", "Redux", "Tailwind CSS", "Express.js", "JWT"],
    githubLink: "https://github.com/askhan963/emcomerce-platform",
    liveLink: "https://www.youtube.com/watch?v=FNIzKc1O4-M", // Replace with actual demo link if available
    image: "/Projects/ecommerce-image.png", // Replace with your actual image path
  },
  {
    title: "Netflix Clone (MERN Stack)",
    description:
      "Built a Netflix clone using the MERN stack, with features like user authentication, movie browsing, and trailer viewing. This project includes user authentication, a main page showcasing available content, and team information. It has received 15 forks and 10 stars on GitHub.",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js"],
    githubLink: "https://github.com/askhan963/netflix-clone-mern",
    liveLink: "https://adorable-biscochitos-00323b.netlify.app/", // Replace with actual demo link if available
    image: "/Projects/netflix-clone-image.png", // Replace with your actual image path
  },
  {
    title: "Intra Social Chat App (React Native)",
    description:
      "Built a social chat application using React Native and Firebase, enabling users to interact via posts and chats in real-time.",
    tags: ["React Native", "Firebase"],
    githubLink: "https://github.com/askhan963/rn-intra-social",
    liveLink: "https://youtu.be/M5d10tV3wKs?si=oS0FZgVBHB7njs03", 
    image: "/Projects/social-chat-app-image.png", // Replace with your actual image path
  },
  {
    title: "Agritech",
    description:
      "Developed an application to assist farmers with agricultural activities, including weather forecasting, crop management, and market analysis to optimize farming practices. Recognized in the Top 100 Global Solution Challenge for innovative tech solutions.",
    tags: ["Agritech", "Weather Forecasting", "Crop Management"],
    githubLink: "https://github.com/GDSC-cuiatd/AgriTech",
    liveLink: "https://agritechaskhan.netlify.app/", // Replace with actual demo link if available
    image: "/Projects/agritech-image.png", // Replace with your actual image path
  },
  {
    title: "Installment Management System (React Native)",
    description:
      "Created a React Native app to help users manage their installments, allowing scheduling, viewing, and tracking of various payments. Features include a dashboard for installment tracking, installment scheduling, and modals for detailed information.",
    tags: ["React Native", "Installment Management"],
    githubLink: "https://github.com/askhan963/installments-management-system",
    liveLink: "https://www.youtube.com/shorts/6tMjFW5JxcA", 
    image: "/Projects/installment-management-image.png", // Replace with your actual image path
  },
  {
    title: "GPA and CGPA Calculator (React + TailwindCSS)",
    description:
      "Developed a web application to help students calculate their GPA and CGPA with a responsive and intuitive user interface. Features include GPA and CGPA calculation, user reviews, and a responsive design for both desktop and mobile devices.",
    tags: ["React.js", "Tailwind CSS"],
    githubLink: "https://github.com/askhan963/comsats-cgpa-calculater",
    liveLink: "https://comsats-cgpa-calculater.vercel.app/", // Replace with actual demo link if available
    image: "/Projects/gpa-cgpa-calculator-image.png", // Replace with your actual image path
  },
  {
    title: "Project Portfolio - React Application",
    description:
      "Developed a portfolio website showcasing various projects, built using React.js. Features include project descriptions, objectives, methodologies, images, embedded demo videos, and links to the source code repositories on GitHub. The site is fully responsive and features interactive elements like hover effects and image transitions.",
    tags: ["React.js", "Portfolio", "Responsive Design"],
    githubLink: "https://github.com/roboraees07/Portfolio-Website",
    liveLink: "https://roboleo.netlify.app/", // Replace with actual demo link if available
    image: "/Projects/portfolio-image.png", // Replace with your actual image path
  }
];


interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  githubLink: string;
  liveLink: string;
  image: string;
}

function ProjectCard({
  title,
  description,
  tags,
  githubLink,
  liveLink,
  image,
}: ProjectCardProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 p-8 rounded-lg shadow-lg flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-8 transition duration-300 hover:shadow-2xl">
      {/* Left Section - Project Details */}
      <div className="lg:w-1/2 space-y-4">
        {/* <h3 className="text-lg text-teal-500 dark:text-teal-400">Recent Project</h3> */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap space-x-2 mt-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-teal-600 dark:bg-teal-700 text-sm px-3 py-1 rounded-full text-white"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* GitHub and External Links */}
        <div className="flex space-x-4 mt-6">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-teal-500 dark:text-teal-400 hover:text-teal-300 transition duration-300"
          >
            <FaGithub />
          </a>
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-teal-500 dark:text-teal-400 hover:text-teal-300 transition duration-300"
          >
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>

      {/* Right Section - Project Image */}
      <div className="lg:w-1/2">
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="rounded-lg shadow-lg transition duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
}



export default function Projects() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-12">
        Projects
      </h1>

      <div className="space-y-12 max-w-6xl w-full">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            tags={project.tags}
            githubLink={project.githubLink}
            liveLink={project.liveLink}
            image={project.image}
          />
        ))}
      </div>
    </section>
  );
}