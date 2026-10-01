import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Mission() {
  return (
    <section
      aria-labelledby="mission-heading"
      className="bg-[var(--color-ink)] text-[var(--color-ink-hi)] border-t border-[var(--color-ink-hair)] relative overflow-hidden"
    >
      <div className="wrap py-28 md:py-40 lg:py-48 text-center">
        <ScrollReveal mode="fade">
          <h2
            id="mission-heading"
            className="display-hero text-[var(--color-ink-hi)]"
          >
            Useful first.
            <br />
            <span className="serif italic font-medium">Then impressive.</span>
          </h2>
          <p className="mt-10 md:mt-14 text-base md:text-lg text-[var(--color-ink-mid)] max-w-md mx-auto">
            Every project here exists because someone needed it to work — on a
            slow network, on a real site, on a deadline.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
