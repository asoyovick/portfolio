"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/content";
import { GitHubIcon } from "@/components/ui/primitives";

const navLinks = [
  { href: "/#work", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/articles", label: "Articles" },
  { href: "/cv", label: "CV" },
  { href: "/#contact", label: "Contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [overLight, setOverLight] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      setIsScrolled(window.scrollY > 8);
      // Probe a point just below the fixed nav; if it sits inside a light
      // section, switch the nav to its light tone.
      const el = document.elementFromPoint(window.innerWidth / 2, 56);
      setOverLight(!!el?.closest(".light"));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const onLight = overLight && !isOpen;
  const tone = onLight
    ? "text-[var(--color-paper-text)]"
    : "text-[var(--color-ink-hi)]";
  const bg = isScrolled
    ? onLight
      ? "bg-[var(--color-paper-hi)]/85 backdrop-blur-sm"
      : "bg-[var(--color-ink-deep)]/85 backdrop-blur-sm"
    : "";

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${bg}`}>
      <nav
        className="wrap relative z-20 flex items-center justify-between py-4 md:py-5"
        aria-label="Primary"
      >
        <Link
          href="/"
          className={`font-mono text-[13px] font-semibold tracking-[0.18em] uppercase ${tone} transition-colors duration-500`}
        >
          Victor Ouma
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`u-link hidden lg:inline-flex text-[13px] font-medium tracking-[0.06em] ${tone} ${
                    isActive(link.href)
                      ? "opacity-100"
                      : "opacity-80 hover:opacity-100"
                  } transition-opacity duration-500`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`u-link inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.06em] ${tone} opacity-80 hover:opacity-100 transition-opacity duration-500`}
          >
            <GitHubIcon size={15} />
            GitHub
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className={`md:hidden p-2 -mr-2 ${tone} transition-colors duration-500`}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {isOpen ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="15" x2="21" y2="15" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu — full screen, painted beneath the nav toggle */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 z-10 bg-[var(--color-ink-deep)] pt-24 transition-[opacity,visibility] duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-hidden={!isOpen}
      >
        <nav className="wrap flex h-full flex-col" aria-label="Mobile">
          <ul className="flex-1 flex flex-col justify-center gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 font-medium text-3xl text-[var(--color-ink-hi)] hover:text-[var(--color-accent-soft)] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="block py-3 font-medium text-3xl text-[var(--color-ink-hi)] hover:text-[var(--color-accent-soft)] transition-colors"
              >
                GitHub
              </a>
            </li>
          </ul>
          <p className="meta pb-10">{site.tagline}</p>
        </nav>
      </div>
    </header>
  );
}
