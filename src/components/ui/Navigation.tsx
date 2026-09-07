"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (typeof window !== "undefined" && !isOpen) {
      const links = document.querySelectorAll('a[href^="#"]');
      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const target = document.querySelector((link as HTMLAnchorElement).getAttribute("href") || "");
          if (target instanceof HTMLElement) {
            target.scrollIntoView({ behavior: "smooth" });
          }
          setIsOpen(false);
        });
      });
    }
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--color-bg-primary)]/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold no-underline hover:opacity-80 transition-opacity"
          aria-label="Victor Ouma - Home"
        >
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold bg-gradient-to-br from-[var(--color-accent-blue)] to-[var(--color-accent-orange)] text-white"
            aria-hidden="true"
          >
            VO
          </span>
          <span className="font-display hidden sm:block">Victor Ouma</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--color-accent-blue)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-accent-blue)] rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTAs - Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="#contact" className="btn btn-primary text-sm px-4 py-2">
            Contact Me
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden p-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {isOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden absolute top-full left-0 right-0 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <ul className="container py-4 flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--color-accent-blue)]/10 text-[var(--color-accent-blue)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="pt-2 pb-4">
            <Link
              href="#contact"
              className="btn btn-primary text-sm px-4 py-3 w-full"
              onClick={() => setIsOpen(false)}
            >
              Contact Me
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
