import ScrollReveal from "@/components/ui/ScrollReveal";
import { howIThink } from "@/lib/content";

export default function HowIThink() {
  return (
    <section
      id="how-i-think"
      aria-labelledby="how-i-think-heading"
      className="light section-light relative overflow-hidden"
    >
      {/* Oversized ghost numeral grounds the editorial composition */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-10 right-0 font-mono font-bold leading-none text-[26rem] md:text-[40rem] text-[var(--color-paper-text)] opacity-[0.035]"
      >
        05
      </span>

      <div className="wrap py-24 md:py-32 lg:py-36">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 md:mb-24">
          <ScrollReveal className="lg:col-span-6">
            <p className="label">How I think</p>
            <h2
              id="how-i-think-heading"
              className="display-lg text-[var(--color-paper-text)] mt-6"
            >
              I like turning
              <br />
              complex problems
              <br />
              <span className="serif italic font-medium">into systems.</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Connected steps */}
        <ol className="relative border-t border-[var(--color-paper-line)]">
          {howIThink.map((step, i) => (
            <ScrollReveal
              key={step.index}
              as="li"
              delay={i * 60}
              className="group relative border-b border-[var(--color-paper-line)]"
            >
              <div className="py-7 md:py-9 flex items-baseline gap-6 md:gap-12 transition-transform duration-500 group-hover:translate-x-2">
                <span className="font-mono text-xs tracking-[0.2em] text-[var(--color-paper-dim)] w-8 flex-none">
                  {step.index}
                </span>
                <h3 className="display-md text-[var(--color-paper-text)] w-32 sm:w-44 flex-none">
                  {step.title}
                </h3>
                <p className="text-[15px] md:text-base text-[var(--color-paper-mid)] max-w-md">
                  {step.description}
                </p>
                {/* Node on the connecting line */}
                <span
                  aria-hidden="true"
                  className="hidden md:block absolute left-0 -bottom-[5px] w-2 h-2 rounded-full bg-[var(--color-paper-line)] group-hover:bg-[var(--color-accent)] transition-colors duration-500"
                />
                <span
                  aria-hidden="true"
                  className="hidden md:block ml-auto font-mono text-xs text-[var(--color-paper-dim)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  →
                </span>
              </div>
            </ScrollReveal>
          ))}
        </ol>

        <ScrollReveal delay={150} className="mt-10 md:mt-14">
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--color-paper-dim)]">
            Problem → Research → Design → Build → Improve
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
