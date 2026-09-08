import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

const contactMethods = [
  {
    type: "email",
    label: "Email",
    value: "oumaasoyoh@gmail.com", // Placeholder - update with real email
    href: "mailto:oumaasoyoh@gmail.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    type: "github",
    label: "GitHub",
    value: "@asoyovick", // Placeholder - update with real username
    href: "https://github.com/asoyovick", // Placeholder - update with real URL
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    type: "linkedin",
    label: "LinkedIn",
    value: "Victor Ouma",
    href: "https://linkedin.com/in/victorouma", // Placeholder - update with real URL
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 lg:py-32 relative"
      aria-labelledby="contact-heading"
    >


      <div className="container relative z-10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="text-[var(--color-blue-500)] text-sm font-medium tracking-widest uppercase font-mono">
              Get In Touch
            </span>
            <h2 id="contact-heading" className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold mt-3 text-[var(--color-text-primary)]">
              Have an idea worth building?
            </h2>
            <div className="accent-line max-w-24 mx-auto mt-4" aria-hidden="true" />
            <p className="text-base sm:text-lg font-mono text-[var(--color-text-secondary)] max-w-2xl mx-auto mt-6 leading-relaxed">
              Whether you have a project in mind, want to collaborate, or just want to say hello — I&apos;d love to hear from you.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact methods */}
        <ScrollReveal delay={100}>
          <div className="max-w-2xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-4 mb-12">
              {contactMethods.map((method, index) => (
                <a
                  key={method.type}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 p-6 rounded-xl bg-[var(--color-blue-500)]/5 border border-[var(--color-blue-500)]/20 hover:border-[var(--color-blue-500)]/40 transition-all duration-300 hover:-translate-y-1"
                  aria-label={`Contact via ${method.label}`}
                >
                  <div
                    className="w-12 h-12 rounded-lg bg-[var(--color-blue-500)]/5 flex items-center justify-center text-[var(--color-text-muted)] group-hover:text-[var(--color-orange-400)] transition-colors"
                  >
                    {method.icon}
                  </div>
                  <span className="text-sm font-medium font-mono text-[var(--color-text-muted)]">
                    {method.label}
                  </span>
                  <span className="text-sm font-mono text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors text-center">
                    {method.value}
                  </span>
                </a>
              ))}
            </div>

            {/* Note about placeholders */}
            <p className="text-xs text-[var(--color-text-muted)] text-center mb-8">
              Replace these with your actual contact details
            </p>

            {/* CTA button */}
            <div className="text-center">
              <a
                href={contactMethods[0].href}
                className="btn btn-primary text-base px-8 py-4 text-lg group"
              >
                Say Hello
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Closing message */}
        <ScrollReveal delay={200}>
          <div className="mt-16 p-8 rounded-2xl bg-[var(--color-blue-500)]/5 border border-[var(--color-blue-500)]/20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-[var(--color-blue-500)]" aria-hidden="true" />

            <blockquote className="text-lg sm:text-xl text-[var(--color-text-primary)] font-mono italic">
              &ldquo;The best way to predict the future is to build it.&rdquo;
            </blockquote>
            <p className="text-sm font-mono text-[var(--color-text-muted)] mt-4">
              — And I&apos;m always looking for the next thing to build.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
