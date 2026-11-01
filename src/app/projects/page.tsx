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
        <p className="section-kicker">Portfolio</p>
        <h1 className="section-heading mb-14">
          All <span className="text-primary">Projects</span>
        </h1>

        {projects.length === 0 ? (
          <p className="text-foreground/60">No projects available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group flex flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-[0_18px_60px_rgba(0,0,0,0.3)] transition-colors duration-300 hover:border-primary/60 hover:bg-white/[0.06]"
              >
                <div className="space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    {project.category}
                  </span>
                  <h2 className="text-2xl font-semibold leading-tight text-foreground group-hover:text-primary">
                    {project.title}
                  </h2>
                  <p className="line-clamp-3 text-sm leading-6 text-foreground/70">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-foreground/80"
                    >
                      {tech}
                    </span>
                  ))}
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
