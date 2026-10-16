"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import projectsData from "@/data/projects.json";
import type { Project } from "@/lib/types";
import { GithubIcon } from "./Icons";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { profile } from "@/data/site";

const projects = projectsData as Project[];

// ─── Inline image with fallback ────────────────────────────────────────
function CoverImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs font-medium p-4 text-center">
        {alt}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      loading="lazy"
      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
    />
  );
}

// ─── Single carousel card ───────────────────────────────────────────────
function CarouselCard({ project }: { project: Project }) {
  return (
    <div className="group relative w-[320px] sm:w-[360px] shrink-0 rounded-2xl bg-white dark:bg-slate-900/60 dark:backdrop-blur-md border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 shadow-sm dark:shadow-none hover:shadow-[0_0_30px_rgba(37,99,235,0.18)] transition-all duration-300 overflow-hidden flex flex-col select-none">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
        <CoverImage src={project.cover} alt={project.title} />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md border border-blue-500/30 rounded-full uppercase tracking-wide">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-50 mb-1.5 group-hover:text-blue-500 transition-colors line-clamp-2 leading-snug">
            {project.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3 line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tech badges */}
        <div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/60 rounded-full border border-slate-200 dark:border-slate-700/50"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action row */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Explore</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <div className="flex items-center gap-1">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Infinite auto-scroll carousel ─────────────────────────────────────
const CARD_W = 368;   // card width + gap
const SPEED  = 0.6;   // px per frame at 60fps

export default function Projects() {
  const trackRef     = useRef<HTMLDivElement>(null);
  const x            = useMotionValue(0);
  const springX      = useSpring(x, { stiffness: 400, damping: 60 });

  const isPaused     = useRef(false);
  const isDragging   = useRef(false);
  const dragStart    = useRef(0);
  const dragXStart   = useRef(0);

  // duplicate items for seamless loop
  const items = [...projects, ...projects, ...projects];
  const loopWidth = projects.length * CARD_W;

  // ── auto-scroll engine ──────────────────────────────────────────────
  useAnimationFrame(() => {
    if (isPaused.current || isDragging.current) return;
    let next = x.get() - SPEED;
    // when we've scrolled one full set, reset silently
    if (next <= -loopWidth) next += loopWidth;
    x.set(next);
  });

  // ── drag / pointer events ───────────────────────────────────────────
  function onPointerDown(e: React.PointerEvent) {
    isDragging.current = true;
    dragStart.current  = e.clientX;
    dragXStart.current = x.get();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!isDragging.current) return;
    const delta = e.clientX - dragStart.current;
    let next    = dragXStart.current + delta;
    // wrap
    if (next <= -loopWidth) next += loopWidth;
    if (next > 0)            next -= loopWidth;
    x.set(next);
  }

  function onPointerUp() {
    isDragging.current = false;
  }

  // ── arrow navigation ────────────────────────────────────────────────
  function shift(dir: -1 | 1) {
    let next = x.get() + dir * CARD_W;
    if (next <= -loopWidth) next += loopWidth;
    if (next > 0)            next -= loopWidth;
    x.set(next);
  }

  return (
    <section id="projects" className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="section-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-section text-slate-900 dark:text-slate-50 mb-2">
            Selected Projects
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-400 mb-10 max-w-2xl">
            A collection of engineering projects showcasing expertise in mechanical design, structural FEA, mechanism dynamics, and machine learning.
          </p>
        </motion.div>
      </div>

      {/* ── Carousel ── */}
      <div className="relative">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-white dark:from-slate-950 to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-white dark:from-slate-950 to-transparent" />

        {/* Track */}
        <div
          className="cursor-grab active:cursor-grabbing overflow-hidden"
          onMouseEnter={() => { isPaused.current = true; }}
          onMouseLeave={() => { isPaused.current = false; isDragging.current = false; }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <motion.div
            ref={trackRef}
            style={{ x: springX }}
            className="flex gap-6 py-6 pl-6 w-max"
          >
            {items.map((project, i) => (
              <CarouselCard key={`${project.slug}-${i}`} project={project} />
            ))}
          </motion.div>
        </div>

        {/* Arrow buttons */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4 z-20">
          <button
            className="pointer-events-auto w-10 h-10 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 flex items-center justify-center shadow-md transition-all duration-200 hover:scale-105"
            onClick={() => shift(1)}
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            className="pointer-events-auto w-10 h-10 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 flex items-center justify-center shadow-md transition-all duration-200 hover:scale-105"
            onClick={() => shift(-1)}
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hint + GitHub button */}
      <div className="section-container mt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <span className="inline-block w-5 h-[1px] bg-slate-300 dark:bg-slate-700" />
            Drag or use arrows to explore
            <span className="inline-block w-5 h-[1px] bg-slate-300 dark:bg-slate-700" />
          </p>
          <motion.a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="group inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-white bg-slate-100 dark:bg-slate-800/50 hover:bg-blue-600 border border-slate-200 dark:border-slate-700 hover:border-blue-600 rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
