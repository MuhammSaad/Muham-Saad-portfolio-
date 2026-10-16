"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Flag, Wrench } from "lucide-react";
import { achievements } from "@/data/site";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Scholarship: Award,
  Certification: Trophy,
  Competition: Flag,
  "Research / Industry": Wrench,
};

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 bg-white dark:bg-slate-950">
      <div className="section-container">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-section text-slate-900 dark:text-slate-50 mb-2">
            Achievements
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-400 mb-12 max-w-2xl">
            Academic honors, competitive engineering milestones, and merit scholarship recognitions at GIKI.
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((item, i) => {
            const Icon = iconMap[item.category] || Trophy;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
                className="rounded-2xl bg-white dark:bg-slate-900/50 dark:backdrop-blur-md border border-slate-200 dark:border-slate-800 hover:border-blue-600/40 p-6 shadow-sm dark:shadow-none hover:shadow-[0_0_25px_rgba(37,99,235,0.15)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-blue-600/10 dark:bg-blue-500/15 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20 uppercase tracking-wide inline-block mb-2.5">
                    {item.category}
                  </span>

                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 leading-snug">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
