"use client";

import { ArrowUp } from "lucide-react";
import { profile } from "@/data/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="section-container">
        <div className="flex items-center justify-between py-8">
          <p className="text-sm text-slate-700 dark:text-slate-400">
            © {currentYear} {profile.name}. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-lg hover:shadow-blue-500/25 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
