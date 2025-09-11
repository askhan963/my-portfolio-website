import Image from "next/image";
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
      className="min-h-screen flex flex-col items-center justify-center bg-background p-6 sm:p-12"
    >
      <h1
        className="text-4xl sm:text-5xl font-bold text-foreground mb-16 text-center"
      >
        Education & Academics
      </h1>

      <div className="w-full max-w-4xl mx-auto">
        <ol className="relative border-s border-border">
          {educationData.map((edu, index) => (
            <li key={index} className="mb-12 ms-8">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-primary/15 rounded-full -start-4 ring-8 ring-card">
                <FaGraduationCap className="w-4 h-4 text-primary" />
              </span>

              <div
                className="p-6 bg-card text-card-foreground rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-border"
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
                      <h3 className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                        {edu.institution}
                      </h3>
                    </a>
                    <p className="text-md font-semibold text-foreground">
                      {edu.degree}
                    </p>
                    <time className="block mb-2 text-sm font-normal leading-none text-foreground/60 mt-1">
                      {edu.period}
                    </time>
                  </div>
                </div>

                <div className="mt-4 border-t border-border pt-4">
                  {edu.cgpa && (
                    <p className="text-sm text-foreground/70 mb-4">
                      <span className="font-semibold text-foreground">
                        Final CGPA:
                      </span>{" "}
                      {edu.cgpa} / 4.0
                    </p>
                  )}
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {edu.coreCourses ? "Core Courses" : "Core Subjects"}
                    </h4>
                    <ul className="space-y-2 text-foreground/70 list-disc pl-5">
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
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Education;