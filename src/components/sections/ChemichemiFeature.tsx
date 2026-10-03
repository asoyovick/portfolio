import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Arrow } from "@/components/ui/primitives";

const facts: Array<[string, string]> = [
  ["Context", "48-hour hackathon — water quality and environmental monitoring."],
  ["Approach", "Ingest Copernicus and GIS data, run AI-assisted analysis, surface alerts over SMS."],
  ["Built for", "Communities, farmers and policymakers — often on slow networks."],
  ["Technology", "Go · GIS data · Copernicus · SMS gateway"],
  ["Learned", "Reliability is a feature. Alerts must degrade gracefully, not fail loudly."],
];

export default function ChemichemiFeature() {
  return (
    <section
      id="chemichemi"
      aria-labelledby="chemichemi-heading"
      className="light section-light border-t border-[var(--color-paper-line)]"
    >
      <div className="wrap py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <ScrollReveal>
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-accent)] mb-6">
              02 / Project — Chemichemi
            </p>
            <h2
              id="chemichemi-heading"
              className="display-lg text-[var(--color-paper-text)] mb-6"
            >
              Water quality alerts for{" "}
              <span className="serif">communities.</span>
            </h2>
            <dl className="divide-y divide-[var(--color-paper-line)] border-y border-[var(--color-paper-line)]">
              {facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 py-4">
                  <dt className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-paper-dim)] pt-0.5">
                    {k}
                  </dt>
                  <dd className="text-[15px] leading-relaxed text-[var(--color-paper-mid)]">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            <Link
              href="/articles/chemichemi-community-water-information"
              className="u-link mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-paper-text)]"
            >
              Read the build notes
              <Arrow />
            </Link>
          </ScrollReveal>

          <ScrollReveal mode="right" delay={150}>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-paper-soft)]">
                <Image
                  src="/chemichemi.jpeg"
                  alt="Chemichemi — community water information interface"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="meta mt-4">
                Chemichemi interface, hackathon build
              </figcaption>
            </figure>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
