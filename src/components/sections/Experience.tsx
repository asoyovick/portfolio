import ScrollReveal from "@/components/ui/ScrollReveal";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  category: string;
}

// Using verified information from the profile
// Dates and specific details can be updated later with actual data
const timelineItems: TimelineItem[] = [
  {
    year: "2024",
    title: "Software Development Focus",
    description: "Building projects across Go, web development, and AI technology — including forum applications, template compilers, and AI-assisted platforms.",
    category: "Development",
  },
  {
    year: "2023",
    title: "Digital Design & Administration",
    description: "Work in design and administration, developing visual design skills alongside organizational responsibilities.",
    category: "Design",
  },
  {
    year: "2022",
    title: "Teaching & General Work",
    description: "Experience in teaching and general work environments, building communication skills and adaptability.",
    category: "Professional",
  },
  {
    year: "Earlier",
    title: "Supermarket Operations",
    description: "Working in retail operations, gaining practical experience in customer service and day-to-day business operations.",
    category: "Operations",
  },
];

const futureFocus = [
  "Deepening full-stack development skills",
  "Building AI-powered products that solve real problems",
  "Exploring construction technology and automation",
  "Creating more complete web applications from idea to deployment",
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 lg:py-32 relative">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle at 30% 30%, var(--color-accent-orange)/5 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />

      <div className="container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[var(--color-accent-blue)] text-sm font-medium tracking-widest uppercase">
              Experience
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
              A journey of growth
            </h2>
            <div className="gradient-line max-w-24 mx-auto mt-4" aria-hidden="true" />
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mt-6">
              My path hasn&apos;t been linear — and that&apos;s intentional. Each experience has added something to how I think about building products.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <ScrollReveal delay={100}>
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div
              className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-[var(--color-border)]"
              aria-hidden="true"
            />

            <div className="space-y-12 sm:space-y-16">
              {timelineItems.map((item, index) => {
                const isCenter = true; // Timeline items are centered on mobile, alternating on desktop

                return (
                  <div
                    key={index}
                    className={`relative flex flex-col sm:flex-row items-start gap-6 ${
                      index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                  >
                    {/* Content */}
                    <div className="sm:w-1/2 sm:pr-12 sm:justify-end">
                      <div className="p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-accent-blue)]/30 transition-colors group">
                        {/* Year badge */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-mono text-[var(--color-accent-orange)] font-medium">
                            {item.year}
                          </span>
                          <span className="px-2 py-0.5 text-xs rounded-full bg-[var(--color-accent-blue)]/10 text-[var(--color-accent-blue)] border border-[var(--color-accent-blue)]/20">
                            {item.category}
                          </span>
                        </div>

                        <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent-blue-light)] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 z-10">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-bg-primary)] border-2 border-[var(--color-accent-blue)] flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-[var(--color-accent-blue)]" aria-hidden="true" />
                      </div>
                    </div>

                    {/* Spacer for mobile */}
                    <div className="sm:w-1/2 sm:pl-12" />
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Future focus */}
        <ScrollReveal delay={200} className="mt-16">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-card)] border border-[var(--color-accent-blue)]/20 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-accent-blue)]/5 rounded-full blur-3xl" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--color-accent-orange)]/5 rounded-full blur-3xl" aria-hidden="true" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-accent-orange)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                <h3 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
                  Currently focused on
                </h3>
              </div>
              <ul className="space-y-3" role="list">
                {futureFocus.map((focus, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-[var(--color-text-secondary)]"
                  >
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--color-accent-orange)] flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm">{focus}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
