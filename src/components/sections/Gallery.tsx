"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { useEffect, useState } from "react";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image_path?: string;
  featured: number;
}

const DEFAULT_GALLERY: GalleryItem[] = [
  { id: 1, title: "Eagles Construct AI", category: "AI & Automation", featured: 0 },
  { id: 2, title: "Chemichemi", category: "Web Application", featured: 0 },
  { id: 3, title: "Forum Application", category: "Web Application", featured: 0 },
  { id: 4, title: "Micro-Template Compiler", category: "Tooling & Libraries", featured: 0 },
  { id: 5, title: "Push-swap", category: "Algorithms", featured: 0 },
  { id: 6, title: "Terminal Workflow", category: "Developer Tools", featured: 0 },
];

function GalleryCard({ item }: { item: GalleryItem }) {
  const hasImage = !!item.image_path;
  return (
    <article
      className={`group relative rounded-2xl overflow-hidden ${hasImage ? "bg-black" : "bg-gradient-to-br from-sky-500/10 to-blue-600/10 border border-sky-500/30"} card-hover`}
    >
      {/* Simulated screenshot area */}
      <div className="aspect-[4/3] sm:aspect-[16/10] relative flex items-center justify-center p-6 overflow-hidden">
        {item.image_path ? (
          <img
            src={item.image_path.startsWith("http") ? item.image_path : (item.image_path.startsWith("uploads/") ? `/${item.image_path}` : `/uploads/${item.image_path}`)}
            alt={item.title}
            className="w-full h-full object-cover transition-opacity group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full flex flex-col gap-3 opacity-70 group-hover:opacity-100 transition-opacity">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="flex-1 grid grid-cols-3 gap-2">
              <div className="col-span-2 bg-[var(--color-bg-card)] rounded-lg p-3 border border-[var(--color-border)]">
                <div className="h-3 w-2/3 rounded bg-[var(--color-bg-tertiary)] mb-2" />
                <div className="h-3 w-full rounded bg-[var(--color-bg-tertiary)]" />
                <div className="h-3 w-4/5 rounded bg-[var(--color-bg-tertiary)] mt-2" />
                <div className="h-3 w-3/5 rounded bg-[var(--color-bg-tertiary)] mt-1" />
              </div>
              <div className="bg-[var(--color-bg-card)] rounded-lg p-3 border border-[var(--color-border)] flex flex-col justify-end">
                <div className="h-2 w-full rounded bg-[var(--color-bg-tertiary)]" />
                <div className="h-2 w-3/4 rounded bg-[var(--color-bg-tertiary)] mt-1" />
              </div>
            </div>
          </div>
        )}

        {/* Dots decoration for some cards */}
        {(!item.image_path) && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400/50 animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400/30" />
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-sky-300 font-mono text-sm tracking-wider uppercase">
            Preview
          </span>
        </div>
      </div>

      {/* Caption */}
      <div className="p-4 flex items-center justify-between">
        <h3 className="font-mono text-sm sm:text-base font-semibold text-[var(--color-text-primary)] group-hover:text-sky-300 transition-colors">
          {item.title}
        </h3>
        <span className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">
          {item.category}
        </span>
      </div>
    </article>
  );
}

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>(DEFAULT_GALLERY);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Try to fetch dynamic gallery; fall back to defaults
    fetch("/api/gallery/public")
      .then((res) => res.json())
      .then((data: GalleryItem[]) => {
        if (Array.isArray(data) && data.length > 0) setItems(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="gallery" className="py-24 lg:py-32 relative bg-[var(--color-bg-secondary)]/30">
      <div className="container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-sky-500 text-sm font-medium tracking-widest uppercase font-mono">
              Gallery
            </span>
            <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold mt-3 text-[var(--color-text-primary)]">
              A peek at the work
            </h2>
            <div className="accent-line max-w-24 mx-auto mt-4" aria-hidden="true" />
            <p className="text-base sm:text-lg font-mono text-[var(--color-text-secondary)] max-w-2xl mx-auto mt-6">
              Selected snapshots from projects I&apos;ve built — each one a different problem, a different stack, a different kind of win.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {items.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 80}>
              <GalleryCard item={item} />
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-mono text-sky-400 hover:text-sky-300 transition-colors group"
          >
            <span className="text-lg leading-none group-hover:scale-110 transition-transform">↓</span>
            <span>See the full list</span>
          </a>
        </div>
      </div>
    </section>
  );
}
