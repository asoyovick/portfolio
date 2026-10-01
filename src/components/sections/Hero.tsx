import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui/primitives";

export default function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative min-h-[100svh] flex flex-col bg-[var(--color-ink-deep)] overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/world.jpg"
          alt="Victor Ouma speaking into a microphone in front of a KijaniSpace banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-110"
        />
        <div className="absolute inset-0 scrim-l z-10" aria-hidden="true" />
      </div>

      <div className="relative z-20 wrap !ml-0 flex-1 flex flex-col justify-end pb-14 md:pb-20 pt-32">
        <div className="max-w-[44rem]">
          <h1 className="display-hero hero-shadow text-4xl md:text-5xl text-[var(--color-ink-hi)]">
            <span className="hero-line">Backend systems</span>
            <span className="hero-line hero-line--2">and full-stack products,</span>
            <span className="hero-line hero-line--3">
              <span className="serif italic font-medium">built to last.</span>
            </span>
        </h1>

          <div className="hero-fade mt-9 md:mt-12 flex flex-wrap items-center gap-4">
            <Link href="#work" className="btn btn--solid">
              See the work
              <Arrow />
            </Link>
            <Link href="#about" className="btn btn--line">
              About me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
