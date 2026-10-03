import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Arrow } from "@/components/ui/primitives";
import { sortedArticles } from "@/lib/articles";

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function Notes() {
  const articles = sortedArticles().slice(0, 5);

  return (
    <section
      id="writing"
      aria-labelledby="writing-heading"
      className="light section-light border-t border-[var(--color-paper-line)]"
    >
      <div className="wrap py-24 md:py-32">
        <div className="flex items-end justify-between gap-8 mb-12 md:mb-16">
          <ScrollReveal>
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-6">
              04 / Notes
            </p>
            <h2
              id="writing-heading"
              className="display-lg text-[var(--color-paper-text)]"
            >
              Writing it <span className="serif">down.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <Link
              href="/articles"
              className="u-link hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-paper-text)]"
            >
              All notes
              <Arrow />
            </Link>
          </ScrollReveal>
        </div>

        <ul className="border-t border-[var(--color-paper-line)]">
          {articles.map((article, i) => (
            <ScrollReveal as="li" key={article.slug} delay={i * 60}>
              <Link
                href={`/articles/${article.slug}`}
                className="group grid grid-cols-[6.5rem_1fr] md:grid-cols-[9rem_1fr_8rem] gap-4 md:gap-10 items-baseline border-b border-[var(--color-paper-line)] py-6 md:py-8"
              >
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-paper-dim)]">
                  {formatDate(article.date)}
                </p>
                <div>
                  <h3 className="text-lg md:text-2xl font-semibold tracking-[-0.01em] text-[var(--color-paper-text)] group-hover:text-[var(--color-accent)] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[15px] text-[var(--color-paper-mid)] leading-relaxed mt-2 max-w-xl">
                    {article.excerpt}
                  </p>
                </div>
                <p className="hidden md:block text-right font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-paper-dim)]">
                  {article.category}
                </p>
              </Link>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
