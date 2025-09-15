import Image from "next/image";
import { FiAward } from "react-icons/fi";

const honors = [
   {
    image: "/Awards/freeCodeCamp.png",
    title: "Relational Database",
    description: "freeCodeCamp",
  },
  {
    image: "/Awards/googleDSC.png",
    title: "Project Submission GDSC Solution Challenge 2024",
    description: "Google Developer Student Clubs",
  },
  {
    image: "/Awards/googleTop100.png",
    title: "Global Top 100 Finalist GDSC Solution Challenge 2024",
    description: "Google Developer Student Clubs",
  },
  {
    image: "/Awards/generativeAI.png",
    title: "Generative AI Fundamentals",
    description: "Google",
  },
  {
    image: "/Awards/simplilearn.png",
    title: "Introduction to Front End Development",
    description: "Simplilearn",
  },
  {
    image: "/Awards/futureTech.png",
    title: "Certificate of Appreciation",
    description: "Future Tech",
  },
  {
    image: "/Awards/gitGithubParticipation.png",
    title: "Certificate of Participation in Git & GitHub for Developers",
    description: "GitHub",
  },
  {
    image: "/Awards/IntroductionToAI.png",
    title: "Certificate of Introduction to AI & ML using Cloud",
    description: "Google",
  },
  {
    image: "/Awards/IntroToMERN.png",
    title: "Certificate of Introduction to MERN Stack",
    description: "Google",
  },
  {
    image: "/Awards/IntroToGenAI.png",
    title: "Certificate of Intro to Gen AI Studio",
    description: "Google",
  },
];

export default function Honors() {
  return (
    <section
      id="honors"
      className="min-h-screen flex flex-col items-center justify-center bg-background p-6"
    >
      <h1
        className="text-4xl sm:text-5xl font-bold text-foreground mb-12 text-center"
      >
        Honors & Certifications
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {honors.map((honor, index) => (
          <div
            key={index}
            className="bg-card text-card-foreground rounded-xl shadow-lg overflow-hidden flex flex-col items-center text-center p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-border"
          >
            <div className="relative w-full h-48 mb-4">
              <Image
                src={honor.image}
                alt={honor.title}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{honor.title}</h3>
            <p className="text-foreground/70 text-sm">{honor.description}</p>
            <FiAward className="text-primary mt-4" size={24} />
          </div>
        ))}
      </div>
    </section>
  );
}
