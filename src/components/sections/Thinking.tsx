import ScrollReveal from "@/components/ui/ScrollReveal";
import { Arrow } from "@/components/ui/primitives";
import { site, thinkingTopics } from "@/lib/content";

export default function Thinking() {
  return (
    <section
      id="thinking"
      aria-labelledby="thinking-heading"
      className="bg-[var(--color-ink-deep)] text-[var(--color-ink-hi)] border-t border-[var(--color-ink-hair)]"
    >
      <div className="wrap py-24 md:py-32 lg:py-36">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          <ScrollReveal className="lg:col-span-7">
            <p className="label">Thinking in public</p>
            <h2
              id="thinking-heading"
              className="display-lg mt-6 mb-8 text-[var(--color-ink-hi)]"
            >
              What I&apos;m learning.
              <br />
              What I&apos;m building.
              <br />
              <span className="serif italic font-medium">
                What I&apos;m figuring out.
              </span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-[var(--color-ink-mid)] max-w-lg mb-10">
              I document ideas, experiments, technical lessons and things
              I&apos;m discovering while building software.
            </p>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="u-link inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ink-hi)]"
            >
              Follow the work
              <Arrow />
            </a>
          </ScrollReveal>

          <ScrollReveal delay={140} className="lg:col-span-5 lg:col-start-9 lg:self-end">
            <ul className="border-t border-[var(--color-ink-hair)]">
              {thinkingTopics.map((topic) => (
                <li
                  key={topic}
                  className="border-b border-[var(--color-ink-hair)] py-4 flex items-center gap-4 text-[15px] text-[var(--color-ink-mid)] hover:text-[var(--color-ink-hi)] transition-colors"
                >
                  <span
                    aria-hidden="true"
                    className="w-1 h-1 rounded-full bg-[var(--color-accent-soft)] flex-none"
                  />
                  {topic}
                </li>
              ))}
            </ul>
            <p className="meta mt-4">Notes in progress — writing soon</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
