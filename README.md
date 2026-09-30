# Victor Ouma — Portfolio

Editorial-style personal portfolio built with **Next.js** (App Router) and
**Tailwind CSS v4**. Fully **code-driven**: all content lives in the codebase,
there is no database, no admin panel and no authentication.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4** (CSS-first config in `src/app/globals.css`)
- **sharp** — local image pipeline for `public/images/` (dev-only)

## Getting started

```bash
npm install
npm run dev
```

No environment variables are required.

## Pages

| Route               | Purpose                                             |
| ------------------- | --------------------------------------------------- |
| `/`                 | Home — hero, what I build, about, work, gallery teaser, contact |
| `/gallery`          | Full gallery with category filtering and lightbox   |
| `/articles`         | Article listing                                     |
| `/articles/{slug}`  | Individual articles                                 |
| `/cv`               | CV / résumé with Download CV button                 |

## Updating content (no CMS — just edit the code)

All content lives in `src/lib/`:

| File                 | Contents                                            |
| -------------------- | --------------------------------------------------- |
| `src/lib/content.ts` | Site copy: tagline, links, what I build, about timeline, selected projects |
| `src/lib/gallery.ts` | Gallery items: title, description, image, category, optional link |
| `src/lib/articles.ts`| Articles: title, slug, excerpt, markdown-ish content, date, category, tags, cover image, reading time |
| `src/lib/cv.ts`      | CV: profile, experience, education, skills, projects, certifications |

To add an article, append an object to `articles` in `src/lib/articles.ts` —
it automatically appears on `/articles`, gets its own page at
`/articles/{slug}`, and is added to the sitemap. To add a gallery item, append
to `galleryItems` in `src/lib/gallery.ts`.

### Images

Put images in `public/` (or `public/images/`) and reference them by path,
e.g. `"/images/drives.jpg"`.

### CV PDF

The **Download CV** button links to `public/cv/Victor-Ouma-CV.pdf`.
Drop your PDF at that path (create the `public/cv/` folder if needed) and it
works — no code changes required.

## Scripts

| Command          | Purpose                                         |
| ---------------- | ----------------------------------------------- |
| `npm run dev`    | Dev server at http://localhost:3000             |
| `npm run build`  | Production build                                |
| `npm run lint`   | ESLint                                          |
| `npm run images` | Regenerate optimized photos in `public/images/` |

## Design system

The visual identity is defined in `src/app/globals.css`:

- Palette: near-black surfaces, warm off-white light sections, one blue accent
- Fonts: Archivo (sans/display), Fraunces (serif italic accents), JetBrains Mono (labels/meta)
- Shared primitives: `.wrap`, `.display-*`, `.label`, `.meta`, `.btn`, `.u-link`, `ScrollReveal`
