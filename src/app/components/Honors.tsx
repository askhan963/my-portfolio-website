"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import { useHonors, Honor as HonorType } from "@/hooks/useHonors";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Honors() {
  const { honors, loading, error } = useHonors();
  // Loading state
  if (loading) {
    return (
      <section
        id="honors"
        className="min-h-screen flex flex-col items-center justify-center bg-background p-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-foreground mb-12 text-center"
        >
          Honors & Certifications
        </motion.h1>
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
        className="min-h-screen flex flex-col items-center justify-center bg-background p-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-foreground mb-12 text-center"
        >
          Honors & Certifications
        </motion.h1>
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
        className="min-h-screen flex flex-col items-center justify-center bg-background p-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-foreground mb-12 text-center"
        >
          Honors & Certifications
        </motion.h1>
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
      className="min-h-screen flex flex-col items-center justify-center bg-background p-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl font-bold text-foreground mb-12 text-center"
      >
        Honors & Certifications
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {honors.map((honor, index) => (
          <motion.div
            key={honor.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-card text-card-foreground rounded-xl shadow-lg overflow-hidden flex flex-col items-center text-center p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-border"
          >
            <div className="relative w-full h-48 mb-4">
              <Image
                src={honor.image}
                alt={honor.title}
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{honor.title}</h3>
            <p className="text-foreground/70 text-sm mb-2">{honor.issuedBy}</p>
            <p className="text-foreground/60 text-xs mb-4">
              {new Date(honor.issuedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <FiAward className="text-primary mt-2" size={24} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
