"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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

  if (loading) {
    return (
      <section id="honors" ref={ref} className="flex min-h-[40vh] flex-col items-center justify-center bg-background p-6">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-foreground/60">Loading honors...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="honors" ref={ref} className="flex min-h-[40vh] flex-col items-center justify-center bg-background p-6 text-center">
        <p className="text-foreground/60">Failed to load honors</p>
        <p className="mt-2 text-sm text-foreground/40">{error}</p>
      </section>
    );
  }

  if (!honors || honors.length === 0) {
    return (
      <section id="honors" ref={ref} className="flex min-h-[40vh] flex-col items-center justify-center bg-background p-6 text-center">
        <p className="text-foreground/60">No honors available at the moment</p>
      </section>
    );
  }

  return (
    <section id="honors" ref={ref} className="relative bg-background py-24 sm:py-32">
      <div className="section-shell">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-heading mb-14"
        >
          Honors &amp; certifications
        </motion.h2>

        <div className="divide-y divide-border border-t border-border">
          {honors.map((honor, index) => (
            <motion.div
              key={honor.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.16) }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:gap-8"
            >
              <div className="relative h-20 w-28 flex-shrink-0 border border-border bg-white">
                <Image
                  src={honor.image}
                  alt={honor.title}
                  fill
                  sizes="112px"
                  className="object-contain p-2"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">{honor.title}</h3>
                <p className="mt-1 text-sm text-primary">{honor.issuedBy}</p>
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-foreground/45">
                {new Date(honor.issuedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
