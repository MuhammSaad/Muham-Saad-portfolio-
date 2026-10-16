# Muhammad Saad — Portfolio

A premium, animated portfolio built with Next.js 16 (App Router), TypeScript,
Tailwind CSS v4, Framer Motion, GSAP-ready structure, and a React Three Fiber
3D gear scene.

## Design direction

Dark, blueprint/engineering-drawing aesthetic: blueprint grid backgrounds,
a drawing-sheet "title block" in the hero, dimension-line section labels,
cyan/blue glassmorphism, Space Grotesk display type + Inter body + JetBrains
Mono for technical labels.

## Editing content (no code changes needed)

- **Projects:** `src/data/projects.json` — one object per project (title,
  category, description, tech, objectives, calculations, results, images).
- **Everything else** (name, bio, skills, timeline, experience, achievements,
  certifications, gallery, testimonials, social links): `src/data/site.ts`.

## Adding your own images (no code changes needed)

Drop files into these folders using the exact paths already referenced in
the data files, or update the paths in the data files to match your filenames:

```
public/images/projects/<project-folder>/cover.jpg
public/images/projects/<project-folder>/cad-1.jpg, fea-1.jpg, ...
public/images/gallery/<category>-<n>.jpg
public/images/certifications/<name>.jpg
public/resume/Muhammad-Saad-Resume.pdf
```

If an image is missing, the site shows a blueprint-style placeholder instead
of a broken image — nothing crashes while you're filling in content.

To replace the hero illustration with your own photo, swap the `<svg>` block
in `src/components/Hero.tsx` for an `<img>`/`<Image>` pointing at
`/public/images/hero/your-photo.jpg`.

## Run it in VS Code

**Prerequisites:** Node.js 20+ and npm. Check with `node -v` in a terminal —
install from https://nodejs.org if missing.

1. **Open the folder:** In VS Code, `File → Open Folder…` and select this
   `portfolio` folder (or run `code portfolio` from a terminal).
2. **Open a terminal in VS Code:** `Terminal → New Terminal` (or `` Ctrl+` ``).
3. **Install dependencies:**
   ```
   npm install
   ```
4. **Start the dev server:**
   ```
   npm run dev
   ```
5. Open the printed URL (usually `http://localhost:3000`) in your browser.
   The page hot-reloads as you edit files.
6. **Build for production** (also a good way to catch typos before deploying):
   ```
   npm run build
   npm run start
   ```

### Recommended VS Code extensions

- ESLint
- Tailwind CSS IntelliSense
- Prettier (optional, for formatting)

## Deploying

The easiest option is [Vercel](https://vercel.com) (made by the Next.js
team): push this folder to a GitHub repo, import it on Vercel, and it
deploys automatically on every push. Netlify and Cloudflare Pages also
support Next.js directly.

## Structure

```
src/
  app/
    page.tsx                 — assembles all homepage sections
    layout.tsx                — fonts, metadata, theme flash prevention
    projects/[slug]/page.tsx  — auto-generated project detail pages
    sitemap.ts, robots.ts     — basic SEO
  components/                — one file per section (Hero, About, Skills, ...)
  data/
    site.ts                   — profile, skills, timeline, experience, etc.
    projects.json             — project data (admin-friendly, no code needed)
  lib/types.ts                — shared TypeScript types
public/
  images/                     — drop your photos here (see folder structure above)
  resume/                     — drop your resume PDF here
```

## Notes on the contact form

The contact form currently opens the visitor's email client with a
pre-filled message (no backend, no server costs, works anywhere). If you'd
rather receive submissions directly, wire it to a form service like
[Formspree](https://formspree.io) or [Resend](https://resend.com) inside
`src/components/Contact.tsx`.
