"use client";

import { motion } from "framer-motion";

const focusAreas = [
  {
    label: "Full-stack delivery",
    detail: "React/Next.js, Node, and relational + document databases, owned from schema to deploy.",
  },
  {
    label: "Applied AI",
    detail: "RAG pipelines, LangChain/LangGraph agents, and LLM-driven features built for production, not demos.",
  },
  {
    label: "Product ownership",
    detail: "Architecture, mentoring, and cross-functional delivery, not just the feature in isolation.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative bg-background py-24 sm:py-32">
      <div className="section-shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="section-heading">About</h2>
          <p className="mt-6 max-w-[62ch] text-lg leading-8 text-foreground/75">
            I'm a full-stack engineer who also builds the AI layer most teams outsource.
            On a given week that means shipping a React/Next.js interface, the API and
            database behind it, and a retrieval-augmented or agentic workflow powered by
            an LLM — the same discipline applied end to end, from schema design to the
            model's context window.
          </p>
          <p className="mt-5 max-w-[62ch] text-lg leading-8 text-foreground/75">
            I'm currently at Funavry Technologies, architecting RAG pipelines for an
            AI-powered talent-discovery platform, after several years building production
            web and mobile products across freelance, agency, and product teams.
          </p>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          viewport={{ once: true, amount: 0.3 }}
          className="divide-y divide-border border-t border-border"
        >
          {focusAreas.map((area) => (
            <div key={area.label} className="grid gap-2 py-6 sm:grid-cols-[1fr_1.6fr] sm:gap-6">
              <dt className="text-base font-semibold text-foreground">{area.label}</dt>
              <dd className="text-sm leading-6 text-foreground/65">{area.detail}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
