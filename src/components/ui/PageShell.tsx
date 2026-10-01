import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function PageShell({
  label,
  title,
  intro,
  image,
  imageAlt,
  children,
}: {
  /** Short route name used for aria labels ("Gallery", "Articles", "CV"). */
  label: string;
  title: React.ReactNode;
  intro: string;
  /** Optional photograph shown on the right side of the hero. */
  image?: string;
  imageAlt?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section
        aria-label={`${label} — page header`}
        className="bg-[var(--color-ink-deep)] text-[var(--color-ink-hi)] relative overflow-hidden"
      >
        {image && (
          <div className="absolute inset-0 w-full h-full -z-10">
            <Image
              src={image}
              alt={imageAlt ?? ""}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 scrim-l" aria-hidden="true" />
            <div
              className="absolute inset-0 bg-gradient-to-b from-[rgba(8,8,10,0.2)] to-[rgba(8,8,10,0.9)]"
              aria-hidden="true"
            />
          </div>
        )}
        <div className="wrap pt-36 pb-14 md:pt-44 md:pb-20">
          <ScrollReveal>
            <h1 className="display-xl max-w-3xl">{title}</h1>
            <p className="text-base md:text-lg leading-relaxed text-[var(--color-ink-mid)] max-w-xl mt-6">
              {intro}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <main aria-label={`${label} content`}>{children}</main>
    </>
  );
}

export function SubNavBack({ href, label }: { href: string; label: string }) {
  return (
    <div className="bg-[var(--color-ink-deep)] border-t border-[var(--color-ink-hair)]">
      <div className="wrap py-4">
        <Link
          href={href}
          className="u-link inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.06em] text-[var(--color-ink-mid)] hover:text-[var(--color-ink-hi)] transition-colors"
        >
          ← {label}
        </Link>
      </div>
    </div>
  );
}
