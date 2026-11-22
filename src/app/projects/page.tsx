import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { getAllProjects } from "@/lib/seo/data";
import { SITE_NAME, absoluteUrl } from "@/lib/seo/site";

export const revalidate = 3600;

const title = `Projects | ${SITE_NAME}`;
const description =
  "Case studies and side projects by Muhammad Awais Khan — full-stack web apps, tools, and experiments built with the MERN stack and Next.js.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/projects"),
    siteName: SITE_NAME,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default async function ProjectsIndexPage() {
  const projects = await getAllProjects();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="section-shell py-28">
        <h1 className="section-heading mb-14">All projects</h1>

        {projects.length === 0 ? (
          <p className="text-foreground/60">No projects available at the moment.</p>
        ) : (
          <div className="divide-y divide-border border-t border-border">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group grid gap-3 py-8 transition-colors sm:grid-cols-[180px_1fr]"
              >
                <span className="section-figure">{project.category}</span>
                <div>
                  <h2 className="font-serif text-2xl font-semibold leading-tight text-foreground group-hover:text-primary">
                    {project.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 max-w-[64ch] text-sm leading-6 text-foreground/70">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span key={tech} className="tag-chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
