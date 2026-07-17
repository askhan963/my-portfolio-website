"use client";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { usePublicProfile, type PublicProfile } from "@/hooks/usePublicProfile";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

import { useInView } from "react-intersection-observer";

export default function Profile({
  initialData = null,
}: {
  initialData?: PublicProfile | null;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "0px" });
  const { profile, loading, error } = usePublicProfile({
    enabled: inView && !initialData,
    initialData,
  });

  // Fallback data if no profile is found
  const fallbackProfile = {
    name: "Muhammad Awais Khan",
    image:
      "https://res.cloudinary.com/dfq1peuay/image/upload/v1758308448/profile/k1hmhu9qqqwecltfak2w.jpg",
    headlines: [
      "MERN Stack Developer",
      "Computer Scientist",
      "Full-Stack Enthusiast",
      "Problem Solver",
      "Tech Innovator",
    ],
    tagline:
      "Passionate about creating web solutions that solve real-world problems. Let's build something great together!",
  };

  const displayProfile = profile || fallbackProfile;

  if (loading) {
    return (
      <section
        id="home"
        ref={ref}
        className="min-h-screen flex items-center justify-center bg-background p-4 sm:p-6 lg:p-8"
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
      className="relative min-h-screen overflow-hidden bg-background px-4 pt-28 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none fixed left-0 top-0 z-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-300/45 blur-3xl" />
      <div className="pointer-events-none fixed right-0 top-1/2 z-0 h-80 w-80 translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />

      <div className="section-shell grid min-h-[calc(100vh-7rem)] grid-cols-1 items-center gap-10 py-10 md:grid-cols-[1fr_minmax(280px,0.8fr)_1fr]">
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center md:text-left"
        >
          <p className="mb-4 text-sm font-light uppercase tracking-[0.38em] text-primary sm:text-base">
            Hi, I am
          </p>
          <h1 className="text-5xl font-medium uppercase leading-[0.95] tracking-[0.08em] text-foreground sm:text-6xl lg:text-7xl">
            {displayProfile.name.split(" ").slice(0, 2).join(" ")}
            <br />
            {displayProfile.name.split(" ").slice(2).join(" ")}
          </h1>
        </motion.div>

        <motion.div
          initial={{ scale: 0.82, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="relative z-0 mx-auto aspect-[4/5] w-full max-w-[390px] md:order-none"
        >
          <div className="absolute inset-x-8 bottom-0 h-3/5 rounded-full bg-fuchsia-300/50 blur-3xl" />
          <div className="absolute inset-x-10 bottom-4 h-2/5 rounded-full bg-primary/40 blur-2xl" />
          <div className="relative h-full overflow-hidden rounded-t-full border border-white/10 bg-white/[0.04] shadow-[0_0_80px_rgba(194,164,255,0.24)]">
            <Image
              src={displayProfile.image}
              alt={`${displayProfile.name} — portfolio profile photo`}
              fill
              sizes="(max-width: 768px) 90vw, 390px"
              className="object-cover object-top saturate-110"
              priority
              fetchPriority="high"
            />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          className="relative z-10 text-center md:text-left"
        >
          <p className="mb-4 text-sm font-light uppercase tracking-[0.38em] text-primary sm:text-base">
            I build
          </p>
          <div className="flex h-[10rem] w-full items-start overflow-hidden sm:h-[11rem] lg:h-[12rem]">
            <TypeAnimation
              sequence={displayProfile.headlines.flatMap((headline) => [
                headline,
                2000,
              ])}
              wrapper="p"
              cursor={true}
              repeat={Infinity}
              className="block w-[16ch] max-w-full text-left text-4xl font-semibold uppercase leading-tight tracking-[0.08em] text-primary sm:text-5xl lg:text-6xl"
            />
          </div>

          <p className="mx-auto mt-2 max-w-md text-base leading-7 text-foreground/70 md:mx-0">
            {displayProfile.tagline}
          </p>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03, y: -3 }}
            className="mt-8 inline-flex items-center rounded-full bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_12px_40px_rgba(194,164,255,0.26)] transition-all duration-300 hover:bg-primary/90"
          >
            Get in touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
