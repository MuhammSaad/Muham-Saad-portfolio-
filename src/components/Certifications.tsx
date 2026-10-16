"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, ExternalLink } from "lucide-react";
import { certifications } from "@/data/site";
import { ImageOrPlaceholder } from "./ProjectCard";

export default function Certifications() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="credentials" className="py-24 bg-white dark:bg-slate-900/30">
      <div className="section-container">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-section text-slate-900 dark:text-slate-50 mb-2">
            Credentials
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-400 mb-12 max-w-2xl">
            Professional certifications and verified industry credentials in CAD design, FEA simulation, and sustainability.
          </p>
        </motion.div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
              onClick={() => setActive(i)}
              className="group rounded-2xl bg-white dark:bg-slate-900/50 dark:backdrop-blur-md border border-slate-200 dark:border-slate-800 hover:border-blue-600/40 shadow-sm dark:shadow-none hover:shadow-[0_0_25px_rgba(37,99,235,0.15)] transition-all duration-300 ease-in-out overflow-hidden flex flex-col cursor-pointer"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <ImageOrPlaceholder
                  src={cert.image}
                  alt={cert.title}
                  className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700/60 flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                  <Award className="w-3.5 h-3.5" />
                  <span>{cert.year}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                    {cert.issuer}
                  </span>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mt-1 group-hover:text-blue-500 transition-colors leading-snug">
                    {cert.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Click to view credential</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Certificate Preview */}
        <AnimatePresence>
          {active !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
              onClick={() => setActive(null)}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl"
              >
                <button
                  onClick={() => setActive(null)}
                  className="absolute right-3 top-3 z-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white p-2 transition-colors"
                  aria-label="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="p-2 bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
                  <ImageOrPlaceholder
                    src={certifications[active].image}
                    alt={certifications[active].title}
                    className="max-h-[65vh] w-auto object-contain rounded-lg"
                  />
                </div>

                <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                    {certifications[active].issuer} · {certifications[active].year}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mt-1">
                    {certifications[active].title}
                  </h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
