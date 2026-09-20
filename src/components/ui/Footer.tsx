import Link from "next/link";
import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink-deep)] text-[var(--color-ink-hi)]">
      <div className="wrap py-14 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <p className="font-mono text-[13px] font-semibold tracking-[0.18em] uppercase">
              Victor Ouma
            </p>
            <p className="meta mt-3">{site.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-link text-sm text-[var(--color-ink-mid)] hover:text-[var(--color-ink-hi)] transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-link text-sm text-[var(--color-ink-mid)] hover:text-[var(--color-ink-hi)] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="u-link text-sm text-[var(--color-ink-mid)] hover:text-[var(--color-ink-hi)] transition-colors"
                >
                  Email
                </a>
              </li>
              <li>
                <Link
                  href="/login"
                  className="u-link font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-ink-dim)] hover:text-[var(--color-ink-hi)] transition-colors"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--color-ink-hair)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="meta">© 2026 Victor Ouma</p>
          <a
            href="#top"
            className="u-link meta hover:text-[var(--color-ink-hi)] transition-colors"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
