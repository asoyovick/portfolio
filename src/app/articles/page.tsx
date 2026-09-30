import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PageShell from "@/components/ui/PageShell";
import { sortedArticles } from "@/lib/articles";
import { site } from "@/lib/content";

export const metadata = {
  title: "Articles | Victor Ouma",
  description:
    "Writing on backend engineering, AI, cybersecurity and learning by building.",
};

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * /articles — listing of all articles, driven by `src/lib/articles.ts`.
 * Featured (newest) article gets a large card; the rest a clean list.
 */
export default function ArticlesPage() {
  const all = sortedArticles();
  const [featured, ...rest] = all;

  return (
    <PageShell
      label="Articles"
      title={
        <>
          Notes from <span className="serif italic font-medium">the build.</span>
        </>
      }
      intro="Ideas, lessons and write-ups from building backend systems, AI products and everything in between."
      image="/images/hero.jpg"
      imageAlt="Victor Ouma at a community tech event"
    >
      <section
        aria-label="Article list"
        className="bg-[var(--color-ink)] text-[var(--color-ink-hi)] border-t border-[var(--color-ink-hair)]"
      >
        <div className="wrap py-16 md:py-24">
          {/* Featured article */}
          <ScrollReveal mode="clip">
            <Link
              href={`/articles/${featured.slug}`}
              className="group grid md:grid-cols-2 gap-8 md:gap-12 items-center block mb-16 md:mb-24"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-ink-soft)]">
                {featured.coverImage ? (
                  <Image
                    src={featured.coverImage}
                    alt={`${featured.title} — cover image`}
                    fill
                    priority
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-ink-soft)]">
                    <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-ink-dim)]">
                      {featured.category}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <p className="meta mb-4">Latest — {formatDate(featured.date)}</p>
                <h2 className="display-lg text-[var(--color-ink-hi)] mb-4 group-hover:text-[var(--color-accent-soft)] transition-colors">
                  {featured.title}
                </h2>
                <p className="text-base md:text-lg text-[var(--color-ink-mid)] leading-relaxed mb-6 max-w-lg">
                  {featured.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <span className="meta">{featured.readingTime}</span>
                  <span className="meta">{featured.category}</span>
                </div>
                <span className="u-link mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ink-hi)]">
                  Read article →
                </span>
              </div>
            </Link>
          </ScrollReveal>

          {/* Remaining articles */}
          <ScrollReveal delay={120}>
            <ul className="border-t border-[var(--color-ink-hair)]">
              {rest.map((article) => (
                <li
                  key={article.slug}
                  className="border-b border-[var(--color-ink-hair)]"
                >
                  <Link
                    href={`/articles/${article.slug}`}
                    className="group grid md:grid-cols-12 gap-4 md:gap-8 items-baseline py-8 md:py-10"
                  >
                    <p className="meta md:col-span-2">
                      {formatDate(article.date)}
                    </p>
                    <div className="md:col-span-7">
                      <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.01em] text-[var(--color-ink-hi)] group-hover:text-[var(--color-accent-soft)] transition-colors">
                        <span className="u-link">{article.title}</span>
                      </h3>
                      <p className="text-[15px] text-[var(--color-ink-mid)] leading-relaxed mt-2 max-w-xl">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="md:col-span-3 md:text-right">
                      <p className="meta">{article.category}</p>
                      <p className="meta mt-1">{article.readingTime}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <p className="meta mt-14">
              More writing on{" "}
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="u-link hover:text-[var(--color-ink-hi)] transition-colors"
              >
                GitHub ↗
              </a>
            </p>
          </ScrollReveal>
        </div>
      </section>
    </PageShell>
  );
}
