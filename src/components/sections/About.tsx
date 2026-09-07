import ScrollReveal from "@/components/ui/ScrollReveal";
import Link from "next/link";

const interests = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Software Development",
    description: "Building practical applications, APIs, and backend systems with Go, JavaScript, and TypeScript."
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a4 4 0 0 1 4 4c0 2-2 4-4 4s-4-2-4-4a4 4 0 0 1 4-4z" />
        <path d="M12 2v10" />
        <path d="M8 12h8" />
        <circle cx="12" cy="18" r="2" />
      </svg>
    ),
    title: "AI Solutions",
    description: "Exploring AI-powered workflows, agents, and practical automation for real-world problems."
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Web Development",
    description: "Creating responsive, accessible websites and applications that work well across devices."
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="21" y1="12" x2="17" y2="12" />
        <line x1="3" y1="12" x2="7" y2="12" />
        <line x1="12" y1="21" x2="12" y2="17" />
        <line x1="12" y1="7" x2="12" y2="3" />
      </svg>
    ),
    title: "Digital Design",
    description: "Combining visual design, branding, and technology to create cohesive digital experiences."
  },
];

const highlights = [
  "Computer Science student passionate about solving practical problems with technology",
  "Strong foundation in Go backend development, including APIs, authentication, and database integration",
  "Experience building full-stack web applications with modern JavaScript, TypeScript, and React",
  "Interest in AI-powered products, construction tech, and business automation",
  "Visual design skills complementing technical work — UI/UX, branding, and digital marketing",
  "Practical DevOps experience with Git, Docker, Linux, and deployment workflows",
];

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 relative">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(circle at 20% 50%, var(--color-accent-blue)/5 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />

      <div className="container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[var(--color-accent-blue)] text-sm font-medium tracking-widest uppercase">
              About
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
              A builder at heart
            </h2>
            <div className="gradient-line max-w-24 mx-auto mt-4" aria-hidden="true" />
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mt-6">
              I combine software engineering, AI, web development, and design to create practical digital products.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left column - Story */}
          <ScrollReveal>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-[var(--color-text-primary)]">
                I&apos;m Victor Ouma — a software developer and digital creator who enjoys building things that work.
              </p>
              <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
                My work spans backend systems in Go, interactive web interfaces with React and TypeScript, and
                exploring how AI can improve real workflows — especially in construction and business automation.
              </p>
              <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
                I also care about design. A good product needs both solid engineering and thoughtful presentation,
                and I try to bring both to what I build.
              </p>
              <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
                When I&apos;m not writing code, I&apos;m probably learning something new, sketching interface ideas,
                or thinking about how to make complex things simpler.
              </p>

              {/* Interests grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {interests.map((interest, index) => (
                  <div
                    key={interest.title}
                    className="p-4 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-accent-blue)]/30 transition-colors group"
                  >
                    <div className="text-[var(--color-accent-blue)] group-hover:text-[var(--color-accent-orange)] transition-colors mb-3">
                      {interest.icon}
                    </div>
                    <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">
                      {interest.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {interest.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right column - Highlights */}
          <ScrollReveal delay={200}>
            <div className="space-y-6">
              <h3 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
                What defines my approach
              </h3>
              <div className="space-y-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-[var(--color-accent-blue)]/10 border border-[var(--color-accent-blue)]/30 flex items-center justify-center">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--color-accent-blue)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>

              {/* Technical snippet decoration */}
              <div className="mt-8 p-4 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] font-mono text-sm">
                <div className="text-[var(--color-text-muted)]">// Portfolio philosophy</div>
                <div className="text-[var(--color-accent-blue-light)]">
                  const approach = {`
    `}
                </div>
                <div className="text-[var(--color-text-primary)] pl-4">
                  {`
  design + engineering,
  practicality over hype,
  build → learn → improve
      `}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
