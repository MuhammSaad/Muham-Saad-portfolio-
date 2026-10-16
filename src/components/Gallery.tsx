"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { galleryCategories, galleryImages } from "@/data/site";
import { ImageOrPlaceholder } from "./ProjectCard";
import SectionHeading from "./SectionHeading";

export default function Gallery() {
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<number | null>(null);

  const filtered =
    filter === "All"
      ? galleryImages
      : galleryImages.filter((g) => g.category === filter);

  return (
    <section id="gallery" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        index="08"
        eyebrow="GALLERY"
        title="Behind the projects"
        description="Drop photos into /public/images/gallery — categorize by filename prefix to sort automatically."
      />

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {["All", ...galleryCategories].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`font-mono-eng rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.12em] transition ${
              filter === cat
                ? "bg-gradient-to-r from-cyan to-blue text-bg"
                : "glass text-muted hover:text-cyan"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {filtered.map((img, i) => (
          <motion.button
            key={img.src}
            onClick={() => setActive(i)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
            className="glass block w-full overflow-hidden rounded-2xl"
          >
            <ImageOrPlaceholder
              src={img.src}
              alt={img.alt}
              className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6"
          >
            <button
              onClick={() => setActive(null)}
              className="absolute right-6 top-6 rounded-full bg-bg/70 p-2 text-ink"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl"
            >
              <ImageOrPlaceholder
                src={filtered[active].src}
                alt={filtered[active].alt}
                className="max-h-[80vh] w-full rounded-2xl object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
