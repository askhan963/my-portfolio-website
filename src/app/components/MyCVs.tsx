import { FaDownload } from "react-icons/fa";
import { FiDownload, FiFileText } from "react-icons/fi";

export default function MyCVs() {
  const cvs = [
    {
      title: "Web Developer Resume",
      description:
        "A comprehensive resume detailing my skills and experience in web development.",
      downloadLink: "/CV/Awais_Khan_Resume.pdf",
    },
  ];

  return (
    <section
      id="my-cvs"
      className="min-h-screen flex flex-col items-center justify-center bg-background p-6"
    >
      <h1
        className="text-4xl sm:text-5xl font-bold text-foreground mb-12 text-center"
      >
        My Resume
      </h1>

      <div className="max-w-2xl w-full">
        {cvs.map((cv, index) => (
          <div
            key={index}
            className="bg-card text-card-foreground rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-border"
          >
            <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
              <FiFileText className="text-primary" size={64} />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-2xl font-bold text-foreground mb-2">{cv.title}</h3>
              <p className="text-foreground/70 mb-4">{cv.description}</p>
            </div>
            <a
              href={cv.downloadLink}
              download
              className="mt-4 md:mt-0 md:ml-auto flex-shrink-0 inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300"
            >
              <FiDownload className="mr-2" />
              Download
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
