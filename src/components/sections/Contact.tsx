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
      </div>
    </section>
  );
}
