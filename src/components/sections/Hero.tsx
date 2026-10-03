import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui/primitives";

export default function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="light section-light"
    >
      <div className="wrap pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          <div className="lg:col-span-7">
            <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-[var(--color-paper-dim)] mb-8">
              
            </p>
            <h1 className="display-hero text-[var(--color-paper-text)]">
              <span className="hero-line">Build reliable</span>
              <span className="hero-line hero-line--2">Distributed systems</span>
              <span className="hero-line hero-line--3">
                <span className="serif italic font-medium">with go.</span>
              </span>
            </h1>
            <p className="hero-fade mt-8 md:mt-10 text-base md:text-lg leading-relaxed text-[var(--color-paper-mid)] max-w-xl">
               Go developer focused on distributed systems, backend infrustructurre and engineering principles behind reliable software.
            </p>
            <div className="hero-fade mt-9 md:mt-12 flex flex-wrap items-center gap-4">
              <Link href="#work" className="btn btn--solid">
                View my work
                <Arrow />
              </Link>
              <Link href="/articles" className="btn btn--line">
                Read my notes
              </Link>
            </div>
          </div>

          <figure className="lg:col-span-4 lg:col-start-9 hero-fade">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-paper-soft)]">
              <Image
                src="/images/drives.jpg"
                alt="Portrait of Victor Ouma"
                fill
                priority
                quality={90}
                sizes="(max-width: 1023px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <figcaption className="meta mt-4 text-[var(--color-paper-dim)]">
              
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
