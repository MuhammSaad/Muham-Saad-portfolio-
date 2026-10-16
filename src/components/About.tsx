"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/site";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-950">
      <div className="section-container">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-section text-slate-900 dark:text-slate-50 mb-2">
            About Me
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-400 mb-12 max-w-2xl">
            A little about who I am, my engineering background, and what I love to build.
          </p>
        </motion.div>

        {/* 12-Column Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Photo Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-xs lg:max-w-sm">
              {/* Blue Glow Halo */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 sm:-inset-4 bg-gradient-to-tr from-blue-600/30 via-blue-500/15 to-transparent blur-2xl rounded-[2rem]"
              />

              {/* Photo Box */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl bg-slate-100 dark:bg-slate-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero/profile.jpeg"
                  alt={profile.name}
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                {/* Status Pill Badge */}
                <div
                  className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 shadow-lg"
                  style={{ backgroundColor: "rgba(15, 23, 42, 0.85)" }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold text-white">
                    Open to opportunities
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio & Stats Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
                Mechanical Engineering student at GIKI building at the intersection of mechanical design, simulation, and intelligent systems. Experienced in structural design and FEA at Atlas Honda, hydropower operations at Malakand-III, and robotics engineering as Technical Lead of Team Techno. I combine CAD, FEA, CFD, and machine learning to turn engineering problems into practical, data-driven solutions.
              </p>
            </div>

            {/* 4 Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8">
              <div className="rounded-xl bg-white dark:bg-slate-900/50 dark:backdrop-blur-md border border-slate-200 dark:border-slate-800 p-3 sm:p-4 text-center hover:border-blue-600/40 transition-colors duration-200">
                <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                  12+
                </div>
                <div className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 mt-1 leading-tight">
                  Projects Built
                </div>
              </div>

              <div className="rounded-xl bg-white dark:bg-slate-900/50 dark:backdrop-blur-md border border-slate-200 dark:border-slate-800 p-3 sm:p-4 text-center hover:border-blue-600/40 transition-colors duration-200">
                <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                  CSWP
                </div>
                <div className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 mt-1 leading-tight">
                  SolidWorks Certified
                </div>
              </div>

              <div className="rounded-xl bg-white dark:bg-slate-900/50 dark:backdrop-blur-md border border-slate-200 dark:border-slate-800 p-3 sm:p-4 text-center hover:border-blue-600/40 transition-colors duration-200">
                <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                  2
                </div>
                <div className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 mt-1 leading-tight">
                  Internships
                </div>
              </div>

              <div className="rounded-xl bg-white dark:bg-slate-900/50 dark:backdrop-blur-md border border-slate-200 dark:border-slate-800 p-3 sm:p-4 text-center hover:border-blue-600/40 transition-colors duration-200">
                <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                  4+
                </div>
                <div className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 mt-1 leading-tight">
                  Certifications
                </div>
              </div>
            </div>

            {/* Social Buttons & Contact CTA */}
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-200"
              >
                <GithubIcon className="w-5 h-5" />
              </a>

              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-200"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>

              {profile.social.scholar && (
                <a
                  href={profile.social.scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Scholar"
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-200"
                >
                  <GraduationCap className="w-5 h-5" />
                </a>
              )}

              {profile.social.researchgate && (
                <a
                  href={profile.social.researchgate}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ResearchGate"
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-200"
                >
                  <BookOpen className="w-5 h-5" />
                </a>
              )}

              <a
                href="#contact"
                className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
              >
                <span>Get in touch</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
