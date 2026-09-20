import ScrollReveal from "@/components/ui/ScrollReveal";
import { Arrow } from "@/components/ui/primitives";
import { site } from "@/lib/content";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="light section-light"
    >
      <div className="wrap py-24 md:py-32 lg:py-40 text-center">
        <ScrollReveal>
          <p className="label label--bare justify-center">Let&apos;s build something</p>
          <h2
            id="contact-heading"
            className="display-xl mt-6 mb-6 text-[var(--color-paper-text)]"
          >
            Have an idea
            <br />
            <span className="serif italic font-medium">worth building?</span>
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-[var(--color-paper-mid)] max-w-md mx-auto mb-10">
            I&apos;m always open to interesting projects, collaborations and
            conversations about technology.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="btn btn--solid"
          >
            Get in touch
            <Arrow />
          </a>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <ul className="mt-14 md:mt-16 flex items-center justify-center gap-x-8 gap-y-3 flex-wrap">
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="u-link text-sm font-medium text-[var(--color-paper-text)]"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="u-link text-sm font-medium text-[var(--color-paper-text)]"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="u-link text-sm font-medium text-[var(--color-paper-text)]"
              >
                Email
              </a>
            </li>
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
