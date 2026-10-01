"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PageShell from "@/components/ui/PageShell";
import { galleryItems, galleryCategories, type GalleryItem } from "@/lib/gallery";

/**
 * /gallery — editorial gallery driven entirely by `src/lib/gallery.ts`.
 * Filter pills switch categories; clicking a card opens a lightbox.
 */
export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const visible = useMemo(
    () =>
      activeCategory === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  // Lock body scroll while the lightbox is open; close on Escape.
  useEffect(() => {
    if (!lightbox) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  return (
    <PageShell
      label="Gallery"
      title={
        <>
          Beyond the <span className="serif italic font-medium">screen.</span>
        </>
      }
      intro="Projects, designs, events and moments captured along the way."
      image="/images/drives.jpg"
      imageAlt="Landscape photograph"
    >
      <section
        aria-labelledby="gallery-page-heading"
        className="bg-[var(--color-ink)] text-[var(--color-ink-hi)]"
      >
        <div className="wrap-wide py-16 md:py-24">
          {/* Category filters */}
          <div
            className="flex flex-wrap gap-2 mb-10 md:mb-14"
            role="tablist"
            aria-label="Filter gallery by category"
          >
            {["All", ...galleryCategories].map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-[11px] tracking-[0.14em] uppercase px-3.5 py-1.5 border transition-colors ${
                  activeCategory === cat
                    ? "border-[var(--color-accent)] text-[var(--color-ink-hi)] bg-[var(--color-accent-mist)]"
                    : "border-[var(--color-ink-hair)] text-[var(--color-ink-mid)] hover:text-[var(--color-ink-hi)] hover:border-[var(--color-ink-mid)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="meta py-12">No items in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {visible.map((item, i) => (
                <ScrollReveal
                  key={item.image}
                  delay={(i % 3) * 90}
                  className={i % 5 === 0 ? "sm:col-span-2" : ""}
                >
                  <button
                    type="button"
                    onClick={() => setLightbox(item)}
                    className="group relative block w-full aspect-[4/3] overflow-hidden bg-[var(--color-ink-soft)] cursor-zoom-in text-left"
                    aria-label={`View ${item.title} larger`}
                  >
                    <Image
                      src={item.image}
                      alt={`${item.title} — ${item.description}`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[rgba(8,8,10,0.85)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="text-sm font-medium text-[var(--color-ink-hi)]">
                        {item.title}
                      </p>
                      <p className="meta mt-0.5">{item.category}</p>
                    </div>
                  </button>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] bg-[rgba(8,8,10,0.94)] backdrop-blur-sm flex items-center justify-center p-5 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
          onClick={(e) => e.target === e.currentTarget && setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-5 right-5 p-2 text-[var(--color-ink-mid)] hover:text-[var(--color-ink-hi)] transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          </button>
          <figure className="max-w-5xl w-full">
            <div className="relative w-full aspect-[16/10] max-h-[80vh] overflow-hidden bg-[var(--color-ink-soft)]">
              <Image
                src={lightbox.image}
                alt={`${lightbox.title} — ${lightbox.description}`}
                fill
                sizes="(max-width: 1023px) 100vw, 1024px"
                className="object-contain"
              />
            </div>
            <figcaption className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mt-4">
              <span className="text-sm text-[var(--color-ink-hi)]">
                {lightbox.title}: {lightbox.description}
              </span>
              <span className="meta flex-none">
                {lightbox.link ? (
                  <a
                    href={lightbox.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="u-link hover:text-[var(--color-ink-hi)] transition-colors"
                  >
                    Open link ↗
                  </a>
                ) : (
                  lightbox.category
                )}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </PageShell>
  );
}
