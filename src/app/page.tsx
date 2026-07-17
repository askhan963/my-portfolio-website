import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Profile from "@/app/components/Profile";
import Experience from "@/app/components/Experience";
import Projects from "@/app/components/Projects";
import Skills from "@/app/components/Skills";
import Education from "@/app/components/Education";
import Honors from "@/app/components/Honors";
import Contact from "@/app/components/Contact";
import Footer from "./components/Footer";
import ContactMe from "./components/ContactMe";
import MyCVs from "./components/MyCVs";
import { getHomepageData } from "@/lib/seo/data";
import { buildHomeJsonLd, serializeJsonLd } from "@/lib/seo/jsonld";
import {
  SITE_CREATOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_CREATOR} — Full-Stack Developer | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${SITE_CREATOR} — Full-Stack Developer | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CREATOR} — Full-Stack Developer | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
  },
};

export default async function Home() {
  const data = await getHomepageData();
  const jsonLd = buildHomeJsonLd(data.profile);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <header>
        <Navbar />
      </header>
      <main>
        <Profile initialData={data.profile} />
        <Experience initialData={data.experiences} />
        <Projects initialData={data.projects} />
        <Skills initialData={data.skills} />
        <Education initialData={data.education} />
        <Honors initialData={data.honors} />
        <MyCVs initialData={data.cvs} />
        <Contact />
      </main>
      <Footer />
      <ContactMe />
    </div>
  );
}
