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
        {/* Explicitly defined grid-cols-1 for phone screens, shifting to grid-cols-2 on lg (desktop) screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          
          {/* Photograph (Top on mobile screens, Left side on desktop screens) */}
          {/* Changed mode to standard fade reveal to troubleshoot the invisible clip-path bug */}
          <ScrollReveal className="order-1 lg:sticky lg:top-24 w-full">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-[var(--color-paper-soft)]">
              <Image
                src="/images/about.jpg" // Ensure this file exists exactly at /public/images/about.jpg
                alt="Portrait of Victor Ouma"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <p className="meta mt-4 text-[var(--color-paper-dim)]">
              </p>
          </ScrollReveal>

          {/* Copy + timeline (Bottom on mobile screens, Right side on desktop screens) */}
          <div className="order-2">
            <ScrollReveal>
              <h2
                id="about-heading"
                className="display-lg text-[var(--color-paper-text)] mt-6 mb-8"
              >
                I&apos;m <span className="serif italic font-medium">Victor.</span>
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-[var(--color-paper-mid)] max-w-xl mb-10">
                I am a foward-thinking software developer, backend engineer,
                and AI enthusiast passionate about transforming complex challenges into intelligent practicle solutions.
                I focus on building innovative digital products, developing intelligent systems and solving real wrld problems.
                Dlriven by curiocity, vissionary thinking and a commitment to continuous growth pushing bounderies of what technology can achieve.
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
