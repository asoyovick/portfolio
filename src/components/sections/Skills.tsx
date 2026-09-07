import ScrollReveal from "@/components/ui/ScrollReveal";

interface SkillCategory {
  name: string;
  skills: string[];
  icon: React.ReactNode;
}

const skillCategories: SkillCategory[] = [
  {
    name: "Engineering",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    skills: ["Go", "JavaScript", "TypeScript", "React", "Next.js", "HTML", "CSS", "REST APIs", "SQLite"],
  },
  {
    name: "AI & Automation",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a4 4 0 0 1 4 4c0 2-2 4-4 4s-4-2-4-4a4 4 0 0 1 4-4z" />
        <path d="M12 2v10" />
        <path d="M8 12h8" />
        <circle cx="12" cy="18" r="2" />
      </svg>
    ),
    skills: ["AI Solutions", "AI Agents", "Business Automation", "AI-assisted Product Development"],
  },
  {
    name: "Design",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="21" y1="12" x2="17" y2="12" />
        <line x1="3" y1="12" x2="7" y2="12" />
        <line x1="12" y1="21" x2="12" y2="17" />
        <line x1="12" y1="7" x2="12" y2="3" />
      </svg>
    ),
    skills: ["UI/UX", "Graphic Design", "Branding", "Responsive Design"],
  },
  {
    name: "Infrastructure",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    skills: ["Git", "Docker", "Linux", "Deployment", "API Integration"],
  },
  {
    name: "Professional",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    skills: ["Problem Solving", "Product Thinking", "Technical Communication", "Digital Marketing"],
  },
];

// Projects that demonstrate specific skills
const skillProjectLinks = [
  {
    skill: "Go",
    project: "Forum App",
    href: "#work",
  },
  {
    skill: "APIs",
    project: "Backend Services",
    href: "#work",
  },
  {
    skill: "AI",
    project: "Eagles Construct AI",
    href: "#work",
  },
  {
    skill: "Web",
    project: "Chemichemi",
    href: "#work",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 lg:py-32 relative">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 80%, var(--color-accent-blue)/5 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />

      <div className="container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[var(--color-accent-blue)] text-sm font-medium tracking-widest uppercase">
              Skills & Capabilities
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
              Tools I work with
            </h2>
            <div className="gradient-line max-w-24 mx-auto mt-4" aria-hidden="true" />
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mt-6">
              I don&apos;t just collect technologies. I use them to build useful things.
            </p>
          </div>
        </ScrollReveal>

        {/* Skill categories grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <ScrollReveal
              key={category.name}
              delay={categoryIndex * 100}
            >
              <div className="group p-6 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-accent-blue)]/30 transition-all duration-300">
                {/* Category header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-[var(--color-accent-blue)] group-hover:text-[var(--color-accent-orange)] transition-colors">
                    {category.icon}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
                    {category.name}
                  </h3>
                </div>

                {/* Skills list */}
                <ul className="space-y-2" role="list" aria-label={`${category.name} skills`}>
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 text-[var(--color-text-secondary)]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-blue)] flex-shrink-0" aria-hidden="true" />
                      <span className="text-sm">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Skills connected to projects */}
        <ScrollReveal delay={200} className="mt-16">
          <div className="p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)] mb-6 text-center">
              Skills in action
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] text-center mb-6">
              These skills aren&apos;t just on a list — they&apos;re demonstrated in real projects.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {skillProjectLinks.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-accent-orange)]/30 transition-colors group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-accent-blue)]/20 to-[var(--color-accent-orange)]/20 flex items-center justify-center">
                    <span className="text-[var(--color-accent-blue)] font-mono font-bold text-sm">
                      {item.skill.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                      {item.skill}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] truncate">
                      → {item.project}
                    </div>
                  </div>
                  <svg
                    className="flex-shrink-0 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-blue)] transition-colors"
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
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
