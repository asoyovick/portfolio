import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Arrow } from "@/components/ui/primitives";
import { aboutTimeline } from "@/lib/content";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="light section-light relative"
    >
      <div className="wrap-wide py-24 md:py-32 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Photograph */}
          <ScrollReveal mode="clip" className="order-2 lg:order-1 lg:sticky lg:top-24">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/about.jpg"
                alt="Portrait of Victor Ouma"
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <p className="meta mt-4">
              Victor Ouma — developer and builder
            </p>
          </ScrollReveal>

          {/* Copy + timeline */}
          <div className="order-1 lg:order-2">
            <ScrollReveal>
              <p className="label">About me</p>
              <h2
                id="about-heading"
                className="display-lg text-[var(--color-paper-text)] mt-6 mb-8"
              >
                I&apos;m <span className="serif italic font-medium">Victor.</span>
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-[var(--color-paper-text)] max-w-xl mb-10">
                I&apos;m a developer and builder interested in the intersection
                of software, AI, backend engineering and cybersecurity. I&apos;m
                learning by building real systems, experimenting with ideas, and
                constantly trying to understand how technology can solve
                problems beyond the screen.
              </p>
              <Link
                href="#drives"
                className="u-link inline-flex items-center gap-2 text-sm font-semibold tracking-[0.06em] text-[var(--color-paper-text)] mb-16 md:mb-20"
              >
                More about me
                <Arrow />
              </Link>
            </ScrollReveal>

            {/* Timeline */}
            <ScrollReveal delay={100}>
              <ol
                className="relative border-l border-[var(--color-paper-line)] ml-1 space-y-8"
                aria-label="Journey"
              >
                {aboutTimeline.map((item, i) => (
                  <li key={item.title} className="relative pl-8">
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 ${
                        i === aboutTimeline.length - 1
                          ? "bg-[var(--color-accent)] border-[var(--color-accent)]"
                          : "bg-[var(--color-paper)] border-[var(--color-paper-dim)]"
                      }`}
                    />
                    <p className="text-[15px] font-semibold text-[var(--color-paper-text)]">
                      {item.title}
                    </p>
                    <p className="text-sm text-[var(--color-paper-mid)] mt-0.5">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
