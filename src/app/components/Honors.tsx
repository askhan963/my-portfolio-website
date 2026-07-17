"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import { useHonors, type Honor } from "@/hooks/useHonors";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

import { useInView } from "react-intersection-observer";

export default function Honors({
  initialData,
}: {
  initialData?: Honor[];
}) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '200px 0px' });
  const { honors, loading, error } = useHonors({
    enabled: inView && !initialData,
    initialData,
  });

  // Loading state
  if (loading) {
    return (
      <section
        id="honors"
        ref={ref}
        className="min-h-screen flex flex-col items-center justify-center bg-background p-6"
      >
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-foreground mb-12 text-center"
        >
          Honors & Certifications
        </motion.h2>
        <div className="flex flex-col items-center justify-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-foreground/60">Loading honors...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section
        id="honors"
        ref={ref}
        className="min-h-screen flex flex-col items-center justify-center bg-background p-6"
      >
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-foreground mb-12 text-center"
        >
          Honors & Certifications
        </motion.h2>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-foreground/60 mb-4">Failed to load honors</p>
          <p className="text-sm text-foreground/40">{error}</p>
        </div>
      </section>
    );
  }

  // Empty state
  if (!honors || honors.length === 0) {
    return (
      <section
        id="honors"
        ref={ref}
        className="min-h-screen flex flex-col items-center justify-center bg-background p-6"
      >
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-foreground mb-12 text-center"
        >
          Honors & Certifications
        </motion.h2>
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-foreground/40 text-xl mb-4">🏆</div>
          <p className="text-foreground/60">No honors available at the moment</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="honors"
      ref={ref}
      className="relative overflow-hidden bg-background py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute right-0 top-16 h-96 w-96 translate-x-1/3 rounded-full bg-primary/10 blur-3xl" />
      <div className="section-shell">
      <motion.p
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="section-kicker"
      >
        Recognition wall
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="section-heading mb-16"
      >
        Honors & Certifications
      </motion.h2>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {honors.map((honor, index) => (
          <motion.div
            key={honor.id}
            initial={{ opacity: 0, y: 56, scale: 0.97, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{
              type: "spring",
              stiffness: 76,
              damping: 18,
              delay: index * 0.08,
            }}
            viewport={{ once: true, amount: 0.25 }}
            className={`corner-frame group relative overflow-hidden bg-card p-5 text-card-foreground shadow-[0_24px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-[background-color,border-color,box-shadow,transform] duration-500 hover:-translate-y-2 hover:border-primary/60 hover:bg-white/[0.07] hover:shadow-[0_34px_110px_rgba(194,164,255,0.14)] ${
              index === 0 ? "md:col-span-2 xl:col-span-2 xl:row-span-2" : ""
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(194,164,255,0.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative flex h-full flex-col">
              <div
                className={`relative mb-5 flex w-full items-center justify-center border border-white/10 bg-black/25 p-4 ${
                  index === 0 ? "min-h-[22rem]" : "min-h-[14rem]"
                }`}
              >
                <Image
                  src={honor.image}
                  alt={honor.title}
                  fill
                  sizes={index === 0 ? "(min-width: 1280px) 50vw, 100vw" : "(min-width: 768px) 25vw, 100vw"}
                  className="object-contain p-4 transition duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between gap-5">
                <div>
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                      Certificate {String(index + 1).padStart(2, "0")}
                    </span>
                    <motion.span
                      animate={{ rotate: [0, 8, 0], y: [0, -3, 0] }}
                      transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/35 text-primary"
                    >
                      <FiAward size={18} />
                    </motion.span>
                  </div>
                  <h3 className={`${index === 0 ? "text-3xl" : "text-xl"} font-semibold leading-tight text-foreground`}>
                    {honor.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium text-primary">{honor.issuedBy}</p>
                </div>

                <p className="border-t border-border pt-4 text-xs uppercase tracking-[0.22em] text-foreground/55">
                  {new Date(honor.issuedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
