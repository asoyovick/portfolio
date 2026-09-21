import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { drivesList } from "@/lib/content";

export default function WhatDrivesMe() {
  return (
    <section
      id="drives"
      aria-labelledby="drives-heading"
      className="relative bg-[var(--color-ink-deep)] text-[var(--color-ink-hi)] overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/drives.jpg"
          alt="Atmospheric view of a modern African workspace at dusk"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-[var(--color-ink-deep)]/72"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[var(--color-ink-deep)] via-transparent to-[var(--color-ink-deep)]"
          aria-hidden="true"
        />
      </div>

      <div className="wrap relative z-10 py-28 md:py-40 lg:py-48">
        <div className="max-w-2xl">
          <ScrollReveal>
           <h2
              id="drives-heading"
              className="display-xl mt-6 mb-8 text-[var(--color-ink-hi)]"
            >
              Technology
              <br />
              <span className="serif italic font-medium">that matters.</span>
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-[var(--color-ink-mid)] max-w-xl">
              My interests sit at the intersection of technology and real-world
              problems, from construction and environmental challenges to
              digital security.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <ul className="mt-12 md:mt-16 flex flex-wrap gap-x-8 gap-y-3">
              {drivesList.map((item) => (
                <li
                  key={item}
                  className="font-mono text-[12px] tracking-[0.22em] uppercase text-[var(--color-ink-hi)]/85 flex items-center gap-3"
                >
                  <span
                    aria-hidden="true"
                    className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-soft)]"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
