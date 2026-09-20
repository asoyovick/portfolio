import ScrollReveal from "@/components/ui/ScrollReveal";
import { whatIBuild } from "@/lib/content";

/** Small inline glyphs — strokes inherit currentColor. */
const glyphs: Record<string, React.ReactNode> = {
  Software: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  AI: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.5 2.5M16.5 16.5L19 19M19 5l-2.5 2.5M7.5 16.5L5 19" />
    </svg>
  ),
  Cybersecurity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  "Digital Products": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="13" rx="1.5" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
};

export default function WhatIBuild() {
  return (
    <section
      id="what-i-build"
      aria-labelledby="what-i-build-heading"
      className="light section-light relative"
    >
      <div className="wrap py-24 md:py-32 lg:py-36">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 mb-16 md:mb-24">
          <ScrollReveal className="lg:col-span-5">
            <h2
              id="what-i-build-heading"
              className="display-lg text-[var(--color-paper-text)] mt-6"
            >
              Technology
              <br />
              <span className="serif italic font-medium">with a purpose.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={120} className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <p className="text-base md:text-lg leading-relaxed text-[var(--color-paper-mid)] max-w-md">
             Go developer focused on distributed systems, backend infrastructre and engineeriering principles
             behind reliable software.
             </p>
          </ScrollReveal>
        </div>

        {/* Four editorial columns — hairline separators, no cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[var(--color-paper-line)]">
          {whatIBuild.map((item, i) => (
            <ScrollReveal
              key={item.index}
              delay={i * 100}
              className={`pt-8 md:pt-10 pb-4 sm:pb-0 sm:px-7 first:pl-0 border-b sm:border-b-0 border-[var(--color-paper-line)] ${
                i > 0 ? "lg:border-l" : ""
              } ${i === 1 ? "sm:border-l" : ""} ${i === 3 ? "sm:border-l lg:border-l" : ""} border-[var(--color-paper-line)]`}
            >
              <div className="flex items-start justify-between mb-14 md:mb-20">
                <span className="font-mono text-xs tracking-[0.2em] text-[var(--color-paper-dim)]">
                  {item.index}
                </span>
                <span className="w-6 h-6 text-[var(--color-accent)]">
                  {glyphs[item.title]}
                </span>
              </div>
              <h3 className="display-md text-[var(--color-paper-text)] mb-3">
                {item.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-[var(--color-paper-mid)] max-w-[30ch]">
                {item.description}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
