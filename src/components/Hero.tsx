"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/site";
import { useEffect, useState } from "react";

const TYPING_SPEED = 70;
const DELETING_SPEED = 35;
const PAUSE_AFTER_TYPE = 3000; // Hold visible for 3 seconds before transitioning to next role
const PAUSE_AFTER_DELETE = 300;

function useTypewriter(words: string[]) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[wordIndex % words.length];

    if (!isDeleting) {
      if (displayed.length < currentWord.length) {
        const timeout = setTimeout(() => {
          setDisplayed(currentWord.slice(0, displayed.length + 1));
        }, TYPING_SPEED);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, PAUSE_AFTER_TYPE);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayed.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayed(currentWord.slice(0, displayed.length - 1));
        }, DELETING_SPEED);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }, PAUSE_AFTER_DELETE);
        return () => clearTimeout(timeout);
      }
    }
  }, [displayed, isDeleting, wordIndex, words]);

  return { displayed };
}

export default function Hero() {
  const { displayed } = useTypewriter(profile.roles);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-transparent to-transparent pointer-events-none" />

      <div className="section-container text-center z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Main Name Heading */}
          <h1 className="text-hero text-blue-500 tracking-tight mb-4">
            {profile.name}
          </h1>

          {/* Animated Typewriter Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-xl sm:text-2xl font-semibold mb-8 flex items-center justify-center gap-1 min-h-[2rem]"
          >
            <span className="text-blue-400">{displayed}</span>
            {/* Blinking cursor */}
            <span
              className="inline-block w-0.5 h-6 bg-blue-400"
              style={{ animation: "blink 0.8s step-end infinite", verticalAlign: "middle" }}
            />
          </motion.div>

          {/* Prompt Paragraph / Bio Summary */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
          >
            Mechanical Design | FEA & Simulation | AI & Robotics | CFD Expertise
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#projects"
              className="px-8 py-3 text-base font-medium text-slate-50 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="px-8 py-3 text-base font-medium text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-slate-400 hover:text-slate-900 dark:hover:text-slate-50 rounded-lg transition-all duration-200"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Scroll Pill Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-slate-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
