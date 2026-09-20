import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Mission() {
  return (
    <section
      aria-labelledby="mission-heading"
      className="bg-[var(--color-ink)] text-[var(--color-ink-hi)] border-t border-[var(--color-ink-hair)] relative overflow-hidden"
    >
      <div className="wrap py-28 md:py-40 lg:py-48 text-center">
        <ScrollReveal mode="fade">
          <p className="label label--bare justify-center mb-8" aria-hidden="true">
            ※
          </p>
          <h2
            id="mission-heading"
            className="display-hero text-[var(--color-ink-hi)]"
          >
            Build technology
            <br />
            <span className="serif italic font-medium">that matters.</span>
          </h2>
          <p className="mt-10 md:mt-14 text-base md:text-lg text-[var(--color-ink-mid)] max-w-md mx-auto">
            Because technology should not only be impressive. It should be
            useful.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
