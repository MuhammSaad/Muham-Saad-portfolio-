"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  title,
  description,
  centered = false,
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${centered ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}`}
    >
      <h2 className="text-section text-slate-900 dark:text-slate-50 mb-2">
        {title}
      </h2>
      {description && (
        <p className="text-base text-slate-700 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
