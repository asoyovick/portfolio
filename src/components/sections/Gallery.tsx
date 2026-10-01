import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { galleryItems } from "@/lib/gallery";

/** Homepage gallery teaser: one item per category, then fill to six. */
export default function Gallery() {
  const picked: typeof galleryItems = [];
  const seen = new Set<string>();
  for (const item of galleryItems) {
    if (!seen.has(item.category)) {
      picked.push(item);
      seen.add(item.category);
    }
    if (picked.length >= 6) break;
  }
  for (const item of galleryItems) {
    if (picked.length >= 6) break;
    if (!picked.includes(item)) picked.push(item);
  }

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="bg-[var(--color-ink)] text-[var(--color-ink-hi)] border-t border-[var(--color-ink-hair)]"
    >
      <div className="wrap-wide py-24 md:py-32 lg:py-36">
        <ScrollReveal className="mb-12 md:mb-16">
          <h2
            id="gallery-heading"
            className="display-lg text-[var(--color-ink-hi)]"
          >
            Beyond the <span className="serif italic font-medium">screen.</span>
          </h2>
          <p className="text-base md:text-lg text-[var(--color-ink-mid)] max-w-md mt-4">
            Photos from projects, events and places I&apos;ve worked.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {picked.map((item, i) => (
            <ScrollReveal
              key={item.image}
              delay={(i % 3) * 90}
              className={i % 5 === 0 ? "sm:col-span-2" : ""}
            >
              <Link
                href="/gallery"
                className="group relative block w-full aspect-[4/3] overflow-hidden bg-[var(--color-ink-soft)]"
                aria-label={`See ${item.title} in the gallery`}
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
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={100}>
          <div className="mt-12 md:mt-16 text-center">
            <Link href="/gallery" className="btn btn--line">
              View full gallery
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
