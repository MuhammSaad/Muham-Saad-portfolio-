"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/site";

const experienceTags: Record<string, string[]> = {
  "Atlas Honda Limited": [
    "SolidWorks",
    "Finite Element Analysis",
    "REBA Ergonomics",
    "Kinematic Simulation",
    "DFM",
    "Production Engineering",
  ],
  "Team Techno": [
    "Robotics Design",
    "Component Integration",
    "Mechanism Optimization",
    "Kinematics & Actuation",
    "CAD & Simulation",
  ],
  "SMEP (Society of Mechanical Engineers in Pakistan)": [
    "SolidWorks Instruction",
    "CAD Workshops",
    "Technical Mentorship",
    "Assembly Modeling",
    "Event Coordination",
  ],
  "Malakand-III Hydropower Plant (81 MW)": [
    "Turbine Maintenance",
    "Condition Monitoring",
    "Vibration Diagnostics",
    "Power Generation",
    "Hydro Assets",
  ],
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-white dark:bg-slate-900/30">
      <div className="section-container">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-section text-slate-900 dark:text-slate-50 mb-2">
            Work &amp; Research Experience
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-400 mb-12 max-w-2xl">
            Professional engineering practice in automotive manufacturing, power utilities, and competitive formula chassis design.
          </p>
        </motion.div>

        {/* Experience Cards List */}
        <div className="space-y-6">
          {experience.map((item, i) => {
            const tags = experienceTags[item.org] || ["Mechanical Engineering", "Design"];
            return (
              <motion.div
                key={item.role + item.org}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/50 dark:backdrop-blur-md border border-slate-200 dark:border-slate-800 hover:border-blue-600/40 shadow-sm dark:shadow-none hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all duration-300 ease-in-out"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                      {item.role}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">
                      {item.org} <span className="text-slate-400 font-normal">· {item.location}</span>
                    </p>
                  </div>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700/60 shrink-0 self-start">
                    {item.period}
                  </span>
                </div>

                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-5">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium text-slate-800 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-600/10 hover:text-blue-600 dark:hover:text-blue-400 rounded-full transition-colors duration-200 border border-slate-200 dark:border-slate-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
