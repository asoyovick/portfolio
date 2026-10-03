import ScrollReveal from "@/components/ui/ScrollReveal";

const groups = [
  {
    label: "Learning",
    items: ["Go concurrency", "Distributed systems", "System design", "PostgreSQL"],
  },
  {
    label: "Building",
    items: ["VECAI prototype", "Backend projects", "This portfolio"],
  },
  {
    label: "Exploring",
    items: ["AI applications", "Cybersecurity", "Developer tooling"],
  },
];

export default function Currently() {
  return (
    <section
      id="currently"
      aria-labelledby="currently-heading"
      className="light section-light border-t border-[var(--color-paper-line)]"
    >
      <div className="wrap py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <ScrollReveal className="lg:col-span-4">
            <h2
              id="currently-heading"
              className="display-md text-[var(--color-paper-text)]"
            >
              Currently
            </h2>
            <p className="text-[15px] text-[var(--color-paper-mid)] leading-relaxed max-w-xs mt-4">
              What I&apos;m spending time on right now. This changes often —
              that&apos;s the point.
            </p>
          </ScrollReveal>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
            {groups.map((group, i) => (
              <ScrollReveal key={group.label} delay={i * 90}>
                <h3 className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-4">
                  {group.label}
                </h3>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-[15px] text-[var(--color-paper-text)] border-b border-[var(--color-paper-line)] pb-2.5"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
