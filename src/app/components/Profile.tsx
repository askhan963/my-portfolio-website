"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { usePublicProfile, type PublicProfile } from "@/hooks/usePublicProfile";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { filterAppliedAIProjects } from "@/lib/ai-projects";
import type { Project } from "@/hooks/useProjects";

import { useInView } from "react-intersection-observer";

export default function Profile({
  initialData = null,
  projects = [],
}: {
  initialData?: PublicProfile | null;
  projects?: Project[];
}) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "0px" });
  const { profile, loading, error } = usePublicProfile({
    enabled: inView && !initialData,
    initialData,
  });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
  }, []);

  const fallbackProfile = {
    name: "Muhammad Awais Khan",
    image:
      "https://res.cloudinary.com/dfq1peuay/image/upload/v1758308448/profile/k1hmhu9qqqwecltfak2w.jpg",
    headlines: [
      "Full-stack engineer",
      "Applied AI engineer",
      "Ships production RAG & LLM features",
    ],
    tagline:
      "I build full-stack products end to end, and I ship the AI layer that powers them — retrieval, agents, and LLM workflows included.",
  };

  const displayProfile = profile || fallbackProfile;
  const aiProjectCount = filterAppliedAIProjects(projects).length;

  if (loading) {
    return (
      <section
        id="home"
        ref={ref}
        className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-6 lg:p-8"
      >
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-foreground/70">Loading profile...</p>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Error loading profile:", error);
  }

  return (
    <section
      id="home"
      ref={ref}
      className="relative bg-background px-4 pt-32 pb-20 sm:px-6 lg:px-8"
    >
      <div className="section-shell grid gap-12 lg:grid-cols-[1.3fr_0.85fr] lg:items-end">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="section-heading max-w-3xl text-5xl sm:text-6xl lg:text-7xl">
            {displayProfile.name}
          </h1>

          <p className="mt-6 max-w-[56ch] text-xl font-medium leading-8 text-foreground sm:text-2xl">
            Full-stack engineer shipping production AI — RAG pipelines, LLM workflows,
            and the full-stack products built around them.
          </p>

          <p className="mt-4 max-w-[58ch] text-base leading-7 text-foreground/65">
            {displayProfile.tagline}
          </p>

          <div className="mt-4 h-6">
            <TypeAnimation
              sequence={displayProfile.headlines.flatMap((headline) => [headline, 2200])}
              wrapper="p"
              cursor={!reducedMotion}
              repeat={0}
              className="font-mono text-sm text-primary"
            />
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center border border-primary bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              View the work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Get in touch
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="hairline-panel flex flex-col"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border">
            <Image
              src={displayProfile.image}
              alt={`${displayProfile.name} — portfolio profile photo`}
              fill
              sizes="(max-width: 1024px) 50vw, 340px"
              className="object-cover object-top grayscale"
              priority
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-primary/25 mix-blend-color" />
          </div>
          <dl className="divide-y divide-border font-mono text-sm">
            <div className="flex items-center justify-between px-5 py-4">
              <dt className="text-foreground/55">Projects shipped</dt>
              <dd className="text-foreground">{projects.length || "—"}</dd>
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <dt className="text-foreground/55">Powered by applied AI</dt>
              <dd className="text-primary">{aiProjectCount || "—"}</dd>
            </div>
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
