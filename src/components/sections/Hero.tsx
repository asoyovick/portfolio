import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-grid"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[var(--color-accent-blue)]/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[var(--color-accent-orange)]/10 blur-3xl"
          aria-hidden="true"
        />

        {/* Technical grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-accent-blue) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-accent-blue) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Floating code-like elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-[5%] text-[var(--color-text-muted)] text-xs font-mono opacity-30 select-none">
          <span className="block">const</span>
          <span className="block pl-2">portfolio = &#123;</span>
          <span className="block pl-4">name: &quot;Victor Ouma&quot;,</span>
          <span className="block pl-4">role: &quot;...&quot;,</span>
          <span className="block pl-4">...</span>
          <span className="block pl-2">&#125;;</span>
        </div>
        <div className="absolute bottom-32 right-[8%] text-[var(--color-text-muted)] text-xs font-mono opacity-20 select-none">
          <span className="block">// Building something</span>
          <span className="block">// meaningful today</span>
        </div>
      </div>

      <div className="container relative z-10 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-blue)]/10 border border-[var(--color-accent-blue)]/20 text-[var(--color-accent-blue-light)] text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent-blue)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-blue)]" />
              </span>
              Available for opportunities
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1]">
              <span className="text-[var(--color-text-primary)]">Victor</span>
              <span
                className="bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-orange)] bg-clip-text text-transparent"
                aria-hidden="true"
              >
                {" "}
                Ouma
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-xl sm:text-2xl lg:text-3xl text-[var(--color-text-secondary)] mb-4 font-light">
              Software Developer · AI Builder · Digital Creator
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="text-lg sm:text-xl text-[var(--color-text-primary)]/80 max-w-2xl mb-10 leading-relaxed">
              I build digital products that turn ideas and real-world problems
              into useful technology.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#work"
                className="btn btn-primary text-base px-6 py-3"
              >
                View My Work
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link
                href="#contact"
                className="btn btn-secondary text-base px-6 py-3"
              >
                Contact Me
              </Link>
            </div>
          </ScrollReveal>

          {/* Visual element - abstract network/creation visualization */}
          <ScrollReveal
            delay={500}
            className="mt-16 lg:mt-20"
          >
            <div className="relative pt-8 border-t border-[var(--color-border)]">
              <div className="flex items-center justify-center gap-2 text-sm text-[var(--color-text-muted)] font-mono">
                <span className="text-[var(--color-accent-orange)]">
                  {"<"}
                </span>
                <span className="text-[var(--color-accent-blue-light)]">
                  Ideas
                </span>
                <span className="text-[var(--color-text-muted)]">
                  {" -> "}
                </span>
                <span className="text-[var(--color-accent-orange)]">
                  {"<"}
                </span>
                <span className="text-[var(--color-accent-blue-light)]">
                  Code
                </span>
                <span className="text-[var(--color-text-muted)]">
                  {" -> "}
                </span>
                <span className="text-[var(--color-accent-orange)]">
                  {"<"}
                </span>
                <span className="text-[var(--color-accent-blue-light)]">
                  Products
                </span>
                <span className="text-[var(--color-text-muted)]">
                  {" -> "}
                </span>
                <span className="text-[var(--color-accent-orange)]">
                  {"<"}
                </span>
                <span className="text-[var(--color-accent-blue-light)]">
                  Impact
                </span>
                <span className="text-[var(--color-accent-orange)]">
                  {"/>"}
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-text-muted)] animate-bounce">
        <span className="text-xs">Scroll to explore</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
