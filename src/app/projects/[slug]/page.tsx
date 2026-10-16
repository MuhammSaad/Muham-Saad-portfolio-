import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Code2, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import projectsData from "@/data/projects.json";
import type { Project } from "@/lib/types";
import CadModelViewer from "@/components/CadModelViewer";
import Model360Viewer from "@/components/Model360Viewer";
import { ImageOrPlaceholder } from "@/components/ProjectCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const projects = projectsData as Project[];

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Muhammad Saad`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
      <Header />
      <main className="relative mx-auto max-w-4xl px-6 pb-24 pt-32">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          <ArrowLeft size={14} /> Back to selected projects
        </Link>

        <div>
          <span className="px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/30 uppercase tracking-wide">
            {project.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mt-4 leading-tight">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-400">
            {project.description}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-blue-600 hover:text-white px-4 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <Code2 size={14} /> View GitHub Source
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-medium transition-colors shadow-sm"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
          {project.model3d ? (
            <div className="h-80 sm:h-[28rem]">
              <CadModelViewer url={project.model3d} />
            </div>
          ) : project.model360 && project.model360.length > 0 ? (
            <div className="h-72 sm:h-96">
              <Model360Viewer frames={project.model360} alt={project.title} />
            </div>
          ) : (
            <ImageOrPlaceholder
              src={project.cover}
              alt={project.title}
              className="h-72 w-full object-cover sm:h-96"
            />
          )}
        </div>

        <section className="mt-12 grid gap-10 sm:grid-cols-2">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
              Problem Statement
            </h2>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {project.problemStatement}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
              Key Objectives
            </h2>
            <ul className="space-y-2">
              {project.objectives.map((o) => (
                <li key={o} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400" />
                  {o}
                </li>
              ))}
            </ul>
          </div>

          {project.calculations.length > 0 && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
                Engineering Calculations
              </h2>
              <ul className="space-y-2">
                {project.calculations.map((c) => (
                  <li key={c} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
              Engineering Results
            </h2>
            <ul className="space-y-2">
              {project.results.map((r) => (
                <li key={r} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {project.gallery.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4">
              Gallery — CAD &amp; Simulation Renders
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {project.gallery.map((src) => (
                <div key={src} className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                  <ImageOrPlaceholder
                    src={src}
                    alt={project.title}
                    className="h-40 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12 p-8 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
            Key Engineering Insights
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{project.lessons}</p>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
