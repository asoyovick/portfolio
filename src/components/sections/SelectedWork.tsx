import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { selectedWork, type Project } from "@/lib/content";

/**
 * Abstract SVG visualizations used when a project has no photo.
 * Geometric, editorial — never fake screenshots.
 */
function ProjectGraphic({ kind }: { kind: Project["kind"] }) {
  if (kind === "algorithm") {
    // Lem-in — a graph: nodes and paths
    return (
      <svg viewBox="0 0 400 260" className="w-full h-full" aria-hidden="true">
        <g stroke="var(--color-ink-hair)" strokeWidth="1">
          <line x1="60" y1="130" x2="150" y2="60" />
          <line x1="60" y1="130" x2="150" y2="200" />
          <line x1="150" y1="60" x2="250" y2="90" />
          <line x1="150" y1="200" x2="250" y2="90" />
          <line x1="250" y1="90" x2="340" y2="130" />
          <line x1="150" y1="60" x2="250" y2="200" />
          <line x1="250" y1="200" x2="340" y2="130" />
        </g>
        <path
          d="M60 130 L150 60 L250 90 L340 130"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />
        {[
          [60, 130],
          [150, 60],
          [150, 200],
          [250, 90],
          [250, 200],
          [340, 130],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={i === 0 || i === 5 ? 8 : 5}
            fill={i === 0 || i === 5 ? "var(--color-accent)" : "#2a2a32"}
            stroke="var(--color-ink-hair)"
          />
        ))}
        <text x="30" y="134" fill="var(--color-ink-dim)" fontSize="11" fontFamily="monospace">
          start
        </text>
        <text x="330" y="156" fill="var(--color-ink-dim)" fontSize="11" fontFamily="monospace">
          end
        </text>
      </svg>
    );
  }
  // Default — layered system diagram
  return (
    <svg viewBox="0 0 400 260" className="w-full h-full" aria-hidden="true">
      <rect x="60" y="40" width="280" height="44" rx="2" fill="none" stroke="var(--color-ink-hair)" />
      <rect x="60" y="108" width="280" height="44" rx="2" fill="none" stroke="var(--color-ink-hair)" />
      <rect x="60" y="176" width="280" height="44" rx="2" fill="none" stroke="var(--color-ink-hair)" />
      <rect x="60" y="108" width="90" height="44" fill="var(--color-accent)" opacity="0.25" />
      <text x="76" y="66" fill="var(--color-ink-mid)" fontSize="11" fontFamily="monospace">interface</text>
      <text x="76" y="134" fill="var(--color-ink-mid)" fontSize="11" fontFamily="monospace">api / logic</text>
      <text x="76" y="202" fill="var(--color-ink-mid)" fontSize="11" fontFamily="monospace">storage</text>
      <line x1="200" y1="84" x2="200" y2="108" stroke="var(--color-ink-dim)" strokeDasharray="3 3" />
      <line x1="200" y1="152" x2="200" y2="176" stroke="var(--color-ink-dim)" strokeDasharray="3 3" />
    </svg>
  );
}

function StackTags({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1" aria-label="Technologies">
      {stack.map((t) => (
        <li key={t} className="meta">
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function SelectedWork() {
  const [featured, ...rest] = selectedWork;

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-[var(--color-ink)] text-[var(--color-ink-hi)]"
    >
      <div className="wrap-wide py-24 md:py-32 lg:py-36">
        <ScrollReveal className="flex items-end justify-between gap-8 mb-14 md:mb-20">
          <div>
            <p className="label">Selected work</p>
            <h2
              id="work-heading"
              className="display-lg mt-6 text-[var(--color-ink-hi)]"
            >
              Selected <span className="serif italic font-medium">work.</span>
            </h2>
          </div>
          <p className="meta hidden md:block pb-2">Archive — Go · AI · Systems</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-24">
          {/* Featured project — full width, image left / text right */}
          <ScrollReveal mode="clip" className="md:col-span-2">
            <article className="group grid md:grid-cols-5 gap-8 md:gap-12 items-center">
              <div className="md:col-span-3 relative aspect-[16/10] overflow-hidden bg-[var(--color-ink-soft)]">
                <Image
                  src={featured.image!}
                  alt={`${featured.name} — ${featured.description}`}
                  fill
                  sizes="(max-width: 767px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="md:col-span-2">
                <p className="meta mb-4">01 — Featured</p>
                <h3 className="display-lg text-[var(--color-ink-hi)] mb-4">
                  {featured.name}
                </h3>
                <p className="text-base md:text-lg text-[var(--color-ink-mid)] leading-relaxed mb-6 max-w-sm">
                  {featured.description}
                </p>
                <StackTags stack={featured.stack} />
                <a
                  href="#vecai"
                  className="u-link mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ink-hi)]"
                >
                  View project →
                </a>
              </div>
            </article>
          </ScrollReveal>

          {/* Remaining projects — asymmetric two-column rhythm */}
          {rest.map((project, i) => {
            const tall = i % 2 === 0;
            return (
              <ScrollReveal
                key={project.id}
                delay={(i % 2) * 100}
                className={tall ? "md:mt-0" : "md:mt-16"}
              >
                <article className="group">
                  <div
                    className={`relative overflow-hidden bg-[var(--color-ink-soft)] ${
                      tall ? "aspect-[4/3]" : "aspect-[4/3.4]"
                    }`}
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`${project.name} — ${project.description}`}
                        fill
                        loading="lazy"
                        sizes="(max-width: 767px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="absolute inset-0 p-6 md:p-8 transition-transform duration-700 group-hover:scale-[1.02]">
                        <ProjectGraphic kind={project.kind} />
                      </div>
                    )}
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.01em] text-[var(--color-ink-hi)] mb-2">
                        <span className="u-link">
                          {project.name}
                        </span>
                      </h3>
                      <p className="text-[15px] text-[var(--color-ink-mid)] leading-relaxed max-w-sm mb-4">
                        {project.description}
                      </p>
                      <StackTags stack={project.stack} />
                    </div>
                    <span className="meta flex-none pt-1">
                      0{i + 2}
                    </span>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
