"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Layers,
  Activity,
  Terminal,
  BarChart3,
  Binary,
  GitBranch,
  Box,
  Sliders,
  Settings,
  Flame,
  Gauge,
  Sparkles,
  FileSpreadsheet,
  Wrench,
  Wind,
  BrainCircuit,
  PenTool,
} from "lucide-react";

interface TechItem {
  name: string;
  category: "Mechanical" | "Simulation" | "Programming" | "Visualization";
  highlight?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const allTech: TechItem[] = [
  // Mechanical / CAD
  { name: "SolidWorks", category: "Mechanical", highlight: "CSWP Certified", icon: Box },
  { name: "CAD / CAM", category: "Mechanical", icon: Settings },
  { name: "GD&T", category: "Mechanical", icon: Sliders },
  { name: "Mechanism Design", category: "Mechanical", icon: Layers },
  { name: "CATIA", category: "Mechanical", icon: PenTool },
  { name: "AutoCAD", category: "Mechanical", icon: Wrench },

  // Simulation & Analysis
  { name: "ANSYS FEA", category: "Simulation", highlight: "Structural Analysis", icon: Activity },
  { name: "COMSOL", category: "Simulation", icon: Layers },
  { name: "CFD (Fluids)", category: "Simulation", icon: Flame },
  { name: "Thermal Analysis", category: "Simulation", icon: Gauge },
  { name: "OpenFOAM", category: "Simulation", icon: Wind },

  // Programming & AI
  { name: "Python", category: "Programming", icon: Terminal },
  { name: "C++", category: "Programming", icon: Binary },
  { name: "MATLAB", category: "Programming", icon: Cpu },
  { name: "Machine Learning", category: "Programming", highlight: "Scikit-Learn / PyTorch", icon: BrainCircuit },
  { name: "PyTorch", category: "Programming", icon: Sparkles },
  { name: "Git / GitHub", category: "Programming", icon: GitBranch },

  // Visualization & Analysis
  { name: "Power BI", category: "Visualization", icon: BarChart3 },
  { name: "MS Excel", category: "Visualization", highlight: "Advanced Modeling", icon: FileSpreadsheet },
  { name: "Plotly", category: "Visualization", icon: BarChart3 },
  { name: "Tableau", category: "Visualization", icon: BarChart3 },
];

const categories = ["All", "Mechanical", "Simulation", "Programming", "Visualization"] as const;

function splitRows(items: TechItem[]) {
  const mid = Math.ceil(items.length / 2);
  return [items.slice(0, mid), items.slice(mid)];
}

function duplicate<T>(arr: T[]): T[] {
  return [...arr, ...arr];
}

function SkillCard({ item }: { item: TechItem }) {
  const Icon = item.icon;
  return (
    <div className="flex-shrink-0 group relative mx-3 px-5 py-4 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-blue-500/60 shadow-sm hover:shadow-[0_0_24px_rgba(37,99,235,0.18)] transition-all duration-300 flex items-center gap-3 min-w-[165px] cursor-default select-none">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300 flex-shrink-0">
        <Icon className="w-5 h-5 text-blue-500 group-hover:text-blue-400 transition-colors duration-300" />
      </div>
      <div className="flex flex-col gap-0.5 overflow-hidden">
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate leading-tight">
          {item.name}
        </span>
        {item.highlight && (
          <span className="text-[9px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-wide truncate">
            {item.highlight}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const filtered =
    activeTab === "All"
      ? allTech
      : allTech.filter((t) => t.category === activeTab);

  const [row1, row2] = splitRows(filtered);
  const row1Dup = duplicate(row1);
  const row2Dup = duplicate(row2);

  return (
    <section id="skills" className="relative py-24 bg-white dark:bg-slate-950 overflow-hidden">

      {/* ── Floating ambient blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Top-left large blue blob */}
        <div className="animate-float-slow absolute -top-20 -left-20 w-96 h-96 rounded-full bg-blue-500/10 dark:bg-blue-500/8 blur-3xl" />
        {/* Bottom-right cyan blob */}
        <div className="animate-float-medium absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-cyan-400/10 dark:bg-cyan-400/7 blur-3xl" style={{ animationDelay: "3s" }} />
        {/* Centre-right violet blob */}
        <div className="animate-float-fast absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-violet-500/8 dark:bg-violet-500/6 blur-2xl" style={{ animationDelay: "1.5s" }} />
        {/* Centre-left indigo blob */}
        <div className="animate-float-medium absolute top-1/3 left-1/3 w-48 h-48 rounded-full bg-indigo-400/8 dark:bg-indigo-400/6 blur-2xl" style={{ animationDelay: "5s" }} />
      </div>

      <div className="section-container relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-section text-slate-900 dark:text-slate-50 mb-2">
            Technical Stack
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-400 mb-10 max-w-2xl">
            Technologies, CAD suites, simulation software, and programming frameworks I work with to build and validate engineering solutions.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2.5 justify-center mb-12"
        >
          {categories.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`relative px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-white bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.35)]"
                    : "text-slate-800 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/50"
                }`}
              >
                {cat === "All" ? "All Tools" : cat}
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Marquee Rows — full-bleed with fade edges */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          className="relative space-y-4"
        >
          {/* Fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-white dark:from-slate-950 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-white dark:from-slate-950 to-transparent" />

          {/* Row 1 — scrolls left */}
          {row1.length > 0 && (
            <div className="flex overflow-hidden">
              <div className="flex animate-marquee-left">
                {row1Dup.map((item, i) => (
                  <SkillCard key={`r1-${item.name}-${i}`} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* Row 2 — scrolls right */}
          {row2.length > 0 && (
            <div className="flex overflow-hidden">
              <div className="flex animate-marquee-right">
                {row2Dup.map((item, i) => (
                  <SkillCard key={`r2-${item.name}-${i}`} item={item} />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

