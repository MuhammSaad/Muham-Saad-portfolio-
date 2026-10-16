"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/site";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  function next() {
    setIndex((i) => (i + 1) % testimonials.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }

  return (
    <section className="relative mx-auto max-w-3xl px-6 py-28">
      <SectionHeading index="09" eyebrow="TESTIMONIALS" title="What collaborators say" />

      <div className="glass relative overflow-hidden rounded-2xl p-10 text-center">
        <Quote className="mx-auto mb-4 text-cyan" size={22} />
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-base leading-relaxed text-ink/90 sm:text-lg">
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="font-mono-eng mt-6 text-xs uppercase tracking-[0.14em] text-cyan">
              {t.name} — {t.role}
            </p>
          </motion.div>
        </AnimatePresence>

        {testimonials.length > 1 && (
          <div className="mt-8 flex justify-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="glass flex h-9 w-9 items-center justify-center rounded-full text-ink"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="glass flex h-9 w-9 items-center justify-center rounded-full text-ink"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
