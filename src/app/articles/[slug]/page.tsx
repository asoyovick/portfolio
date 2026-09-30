import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { SubNavBack } from "@/components/ui/PageShell";
import {
  getArticle,
  relatedArticles,
  articles,
} from "@/lib/articles";

/**
 * /articles/[slug] — individual article page. Content is plain text with
 * markdown-ish structure (## headings, - lists, 1. lists, blank-line
 * paragraphs) rendered by this component. Newer Next versions may offer
 * markdown loaders, but a tiny renderer keeps the site dependency-free.
 */
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found | Victor Ouma" };
  return {
    title: `${article.title} | Victor Ouma`,
    description: article.excerpt,
  };
}

type Block =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] };

function parseBlocks(content: string): Block[] {
  const blocks: Block[] = [];
  const lines = content.split("\n");
  let para: string[] = [];
  let list: { kind: "ul" | "ol"; items: string[] } | null = null;

  const flushPara = () => {
    if (para.length) {
      blocks.push({ kind: "p", text: para.join(" ") });
      para = [];
    }
  };
  const flushList = () => {
    if (list) {
      blocks.push({ kind: list.kind, items: list.items });
      list = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushPara();
      flushList();
      continue;
    }
    if (line.startsWith("## ")) {
      flushPara();
      flushList();
      blocks.push({ kind: "h2", text: line.slice(3) });
      continue;
    }
    if (/^[-•]\s+/.test(line)) {
      flushPara();
      if (!list || list.kind !== "ul") {
        flushList();
        list = { kind: "ul", items: [] };
      }
      list.items.push(line.replace(/^[-•]\s+/, ""));
      continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      flushPara();
      if (!list || list.kind !== "ol") {
        flushList();
        list = { kind: "ol", items: [] };
      }
      list.items.push(line.replace(/^\d+\.\s+/, ""));
      continue;
    }
    flushList();
    para.push(line);
  }
  flushPara();
  flushList();
  return blocks;
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = relatedArticles(article);
  const blocks = parseBlocks(article.content);

  return (
    <>
      <SubNavBack href="/articles" label="All articles" />

      <main>
        <article>
          {/* Header */}
          <header className="bg-[var(--color-ink-deep)] text-[var(--color-ink-hi)]">
            <div className="wrap pt-14 pb-16 md:pt-20 md:pb-24">
              <ScrollReveal>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <p className="label">{article.category}</p>
                  <p className="meta">{formatDate(article.date)}</p>
                  <p className="meta">{article.readingTime}</p>
                </div>
                <h1 className="display-xl mt-6 max-w-3xl">{article.title}</h1>
                <p className="text-base md:text-lg leading-relaxed text-[var(--color-ink-mid)] max-w-2xl mt-6">
                  {article.excerpt}
                </p>
              </ScrollReveal>
            </div>
            {article.coverImage && (
              <div className="wrap-wide pb-16 md:pb-24">
                <ScrollReveal mode="clip">
                  <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[var(--color-ink-soft)]">
                    <Image
                      src={article.coverImage}
                      alt={`${article.title} — cover image`}
                      fill
                      priority
                      sizes="(max-width: 767px) 100vw, (max-width: 1519px) 100vw, 1520px"
                      className="object-cover"
                    />
                  </div>
                </ScrollReveal>
              </div>
            )}
          </header>

          {/* Content */}
          <div className="bg-[var(--color-ink)] text-[var(--color-ink-hi)]">
            <div className="wrap py-16 md:py-24">
              <div className="max-w-[42rem]">
                {blocks.map((block, i) => {
                  switch (block.kind) {
                    case "h2":
                      return (
                        <h2
                          key={i}
                          className="display-md text-[var(--color-ink-hi)] mt-12 mb-5"
                        >
                          {block.text}
                        </h2>
                      );
                    case "ul":
                      return (
                        <ul key={i} className="space-y-3 my-6">
                          {block.items.map((item, j) => (
                            <li
                              key={j}
                              className="flex gap-4 text-base md:text-lg leading-relaxed text-[var(--color-ink-mid)]"
                            >
                              <span
                                aria-hidden="true"
                                className="w-1 h-1 rounded-full bg-[var(--color-accent-soft)] mt-3 flex-none"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      );
                    case "ol":
                      return (
                        <ol key={i} className="space-y-3 my-6">
                          {block.items.map((item, j) => (
                            <li
                              key={j}
                              className="flex gap-4 text-base md:text-lg leading-relaxed text-[var(--color-ink-mid)]"
                            >
                              <span className="font-mono text-sm text-[var(--color-accent-soft)] mt-1 flex-none">
                                {String(j + 1).padStart(2, "0")}
                              </span>
                              {item}
                            </li>
                          ))}
                        </ol>
                      );
                    default:
                      return (
                        <p
                          key={i}
                          className="text-base md:text-lg leading-relaxed text-[var(--color-ink-mid)] my-6"
                        >
                          {block.text}
                        </p>
                      );
                  }
                })}

                {/* Tags */}
                <ul className="flex flex-wrap gap-2 mt-14" aria-label="Tags">
                  {article.tags.map((tag) => (
                    <li
                      key={tag}
                      className="font-mono text-[11px] tracking-[0.14em] uppercase px-3 py-1.5 border border-[var(--color-ink-hair)] text-[var(--color-ink-mid)]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section
              aria-labelledby="related-heading"
              className="bg-[var(--color-ink)] text-[var(--color-ink-hi)] border-t border-[var(--color-ink-hair)]"
            >
              <div className="wrap py-16 md:py-20">
                <h2 id="related-heading" className="display-md mb-10">
                  Keep <span className="serif italic font-medium">reading.</span>
                </h2>
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {related.map((rel) => (
                    <li key={rel.slug}>
                      <Link href={`/articles/${rel.slug}`} className="group block">
                        <p className="meta mb-3">
                          {rel.category} · {rel.readingTime}
                        </p>
                        <h3 className="text-lg font-semibold text-[var(--color-ink-hi)] group-hover:text-[var(--color-accent-soft)] transition-colors">
                          <span className="u-link">{rel.title}</span>
                        </h3>
                        <p className="text-sm text-[var(--color-ink-mid)] leading-relaxed mt-2">
                          {rel.excerpt}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </article>
      </main>
    </>
  );
}
