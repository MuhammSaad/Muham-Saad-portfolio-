"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./SiteChrome";
import { profile } from "@/data/site";
import { motion } from "framer-motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#research", label: "Research" },
  { href: "#experience", label: "Experience" },
  { href: "#credentials", label: "Credentials" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);

      const sectionIds = ["about", "skills", "projects", "research", "experience", "credentials", "achievements", "contact"];
      for (const id of sectionIds.slice().reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 py-3.5 shadow-sm"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Logo / Branding */}
        <a href="#" className="flex items-center gap-3 group min-w-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xs shrink-0 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-shadow duration-200">
            MS
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm font-bold text-slate-900 dark:text-slate-50 group-hover:text-blue-500 transition-colors duration-200 truncate">
              {profile.name}
            </span>
            <span className="hidden 2xl:inline text-slate-300 dark:text-slate-600">|</span>
            <span className="hidden 2xl:inline text-slate-600 dark:text-slate-400 text-sm whitespace-nowrap">
              Mechanical Engineer
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden xl:flex items-center gap-6">
          {links.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-sm py-2 whitespace-nowrap transition-colors duration-200 nav-link-underline font-medium ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 active"
                    : "text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
                }`}
              >
                {link.label}
              </a>
            );
          })}

          <ThemeToggle />

          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium text-slate-50 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]"
          >
            GitHub
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="p-2 text-slate-400 hover:text-slate-50 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="xl:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex flex-col gap-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center px-4 py-2.5 text-sm font-medium text-slate-50 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
            >
              GitHub Profile
            </a>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
