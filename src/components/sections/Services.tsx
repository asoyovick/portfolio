import ScrollReveal from "@/components/ui/ScrollReveal";

const services = [
  {
    title: "Software Development",
    description: "Building practical web applications, APIs, and backend systems that solve real problems.",
    details: [
      "Go backend development with HTTP APIs",
      "RESTful service design and authentication",
      "Database integration with SQLite",
      "CLI tools and utilities",
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    gradient: "from-[var(--color-accent-blue)]/20 to-[var(--color-accent-blue)]/5",
    accentColor: "var(--color-accent-blue)",
  },
  {
    title: "AI & Automation",
    description: "Exploring AI-powered workflows, intelligent agents, and practical automation for business needs.",
    details: [
      "AI-assisted product development",
      "Construction technology concepts",
      "Business process automation",
      "Intelligent workflow design",
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a4 4 0 0 1 4 4c0 2-2 4-4 4s-4-2-4-4a4 4 0 0 1 4-4z" />
        <path d="M12 2v10" />
        <path d="M8 12h8" />
        <circle cx="12" cy="18" r="2" />
      </svg>
    ),
    gradient: "from-[var(--color-accent-orange)]/20 to-[var(--color-accent-orange)]/5",
    accentColor: "var(--color-accent-orange)",
  },
  {
    title: "Web Development",
    description: "Creating responsive, accessible websites and applications that work well across all devices.",
    details: [
      "Responsive design and layouts",
      "Interactive web interfaces",
      "React and Next.js applications",
      "API-connected frontend experiences",
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    gradient: "from-[var(--color-accent-blue)]/15 to-[var(--color-accent-orange)]/10",
    accentColor: "var(--color-accent-blue)",
  },
  {
    title: "Digital Design",
    description: "Combining visual design, branding, and technology to create cohesive digital experiences.",
    details: [
      "UI/UX design and prototyping",
      "Brand identity and visual systems",
      "Social media and marketing visuals",
      "Design systems for applications",
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="21" y1="12" x2="17" y2="12" />
        <line x1="3" y1="12" x2="7" y2="12" />
        <line x1="12" y1="21" x2="12" y2="17" />
        <line x1="12" y1="7" x2="12" y2="3" />
      </svg>
    ),
    gradient: "from-[var(--color-accent-orange)]/15 to-[var(--color-accent-orange)]/5",
    accentColor: "var(--color-accent-orange)",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 lg:py-32 relative"
      aria-labelledby="services-heading"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, var(--color-accent-blue)/5 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, var(--color-accent-orange)/5 0%, transparent 40%)
          `,
        }}
        aria-hidden="true"
      />

      <div className="container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[var(--color-accent-orange)] text-sm font-medium tracking-widest uppercase">
              What I Do
            </span>
            <h2 id="services-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
              Building across disciplines
            </h2>
            <div className="gradient-line max-w-24 mx-auto mt-4" aria-hidden="true" />
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mt-6">
              From backend systems to visual design — I work across the full spectrum of digital product creation.
            </p>
          </div>
        </ScrollReveal>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ScrollReveal
              key={service.title}
              delay={index * 100}
            >
              <article className="group relative rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-accent-blue)]/20 transition-all duration-300">
                {/* Decorative gradient area */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} aria-hidden="true" />

                <div className="relative p-6 lg:p-8">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] flex items-center justify-center mb-5 group-hover:border-[var(--color-accent-blue)]/30 transition-colors"
                  >
                    <span className={`text-${index % 2 === 0 ? 'accent-blue' : 'accent-orange'}`} style={{ color: service.accentColor }}>
                      {service.icon}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-accent-blue-light)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2" role="list">
                    {service.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
                        className="flex items-start gap-2.5 text-sm text-[var(--color-text-muted)]"
                      >
                        <span
                          className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: service.accentColor }}
                          aria-hidden="true"
                        />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
