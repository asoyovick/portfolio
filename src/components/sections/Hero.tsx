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
      {/* Photograph — dominates the right side */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <Image
          src="/images/hero.jpg"
          alt="Victor Ouma speaking into a microphone in front of a KijaniSpace banner"
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark negative space flowing in from the left; keeps type legible */}
        <div
          className="absolute inset-0 scrim-l"
          aria-hidden="true"
        />
      </div>

      {/* Content — left column */}
      <div className="relative z-10 wrap flex-1 flex flex-col justify-end pb-14 md:pb-20 pt-32 !ml-0">
        <div className="max-w-[44rem]">
          <h1 className="display-hero text-4xl md:text-5xl text-[var(--color-ink-hi)]">
            <span className="hero-line">Engineering reliable,</span>
            <span className="hero-line hero-line--2">distributed systems that</span>
            <span className="hero-line hero-line--3">
              <span className="serif italic font-medium">scale.</span>
            </span>
          </h1>

        <div className="hero-fade mt-9 md:mt-12 flex flex-wrap items-center gap-4">
            <Link href="#github/asoyovick" className="btn btn--solid">
              Explore my work
              <Arrow />
            </Link>
            <Link href="#about" className="btn btn--line">
              Get to know me
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="hero-fade absolute left-1/2 -translate-x-1/2 bottom-5 z-10 drift"
        aria-hidden="true"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-ink-dim)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
