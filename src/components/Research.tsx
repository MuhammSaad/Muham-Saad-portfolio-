"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { researchCards } from "@/data/site";

export default function Research() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="research" className="py-24 bg-white dark:bg-slate-950">
      <div className="section-container">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-section text-slate-900 dark:text-slate-50 mb-2">
            Research Interest
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-400 mb-12 max-w-2xl">
            Applied engineering research, industrial simulation investigations, and prognostic telemetry modeling.
          </p>
        </motion.div>

        {/* Research Domains Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {researchCards.map((card, i) => {
            const isOpen = open === card.title;
            return (
              <motion.button
                key={card.title}
                onClick={() => setOpen(isOpen ? null : card.title)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
                className="rounded-xl bg-white dark:bg-slate-900/50 dark:backdrop-blur-md border border-slate-200 dark:border-slate-800 hover:border-blue-600/40 p-5 sm:p-6 text-left transition-all duration-200 cursor-pointer shadow-sm dark:shadow-none hover:shadow-[0_0_20px_rgba(37,99,235,0.1)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                    {card.title}
                  </h3>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="mt-1 text-slate-400 hover:text-blue-500 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.span>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {card.summary}
                </p>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden pt-3 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 mt-3"
                    >
                      {card.detail}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
