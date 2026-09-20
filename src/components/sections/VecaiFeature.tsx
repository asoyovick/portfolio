import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Arrow } from "@/components/ui/primitives";

/**
 * Visual representation of the VECAI interface — a design mockup only.
 * Figures are illustrative UI, not real-world metrics.
 */
function VecaiMockup() {
  const materials = [
    { name: "Cement", note: "Bulk order", width: "78%" },
    { name: "Steel", note: "Quote pending", width: "55%" },
    { name: "Timber", note: "In comparison", width: "64%" },
  ];
  return (
    <div className="vecai-mock rounded-xl border border-[var(--color-ink-hair)] bg-[var(--color-ink-soft)]/95 backdrop-blur-md shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)] overflow-hidden text-left">
      {/* Window bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-ink-hair)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#3a3a44]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#3a3a44]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#3a3a44]" aria-hidden="true" />
        <span className="ml-3 font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-ink-dim)]">
          VECAI — Project Overview
        </span>
      </div>

      <div className="grid grid-cols-[52px_1fr] sm:grid-cols-[64px_1fr]">
        {/* Sidebar */}
        <div className="border-r border-[var(--color-ink-hair)] py-4 flex flex-col items-center gap-4">
          <span className="w-7 h-7 rounded bg-[var(--color-accent)] flex items-center justify-center font-mono text-[10px] font-bold text-white">
            V
          </span>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`w-5 h-5 rounded ${i === 0 ? "bg-[var(--color-accent)]/30" : "bg-[#2a2a32]"}`}
              aria-hidden="true"
            />
          ))}
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          {/* Overview stats — illustrative UI */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { k: "Progress", v: "68%" },
              { k: "Budget used", v: "54%" },
              { k: "Open tasks", v: "12" },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded border border-[var(--color-ink-hair)] bg-[var(--color-ink)]/60 px-3 py-2.5"
              >
                <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--color-ink-dim)]">
                  {s.k}
                </p>
                <p className="text-sm sm:text-base font-semibold text-[var(--color-ink-hi)] mt-0.5">
                  {s.v}
                </p>
              </div>
            ))}
          </div>

          {/* Progress + estimate split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <div className="rounded border border-[var(--color-ink-hair)] bg-[var(--color-ink)]/60 p-3">
              <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--color-ink-dim)] mb-2">
                Project progress
              </p>
              <div className="h-1.5 rounded-full bg-[#2a2a32] overflow-hidden">
                <div className="h-full w-[68%] rounded-full bg-[var(--color-accent)]" />
              </div>
              <p className="mt-2 text-[11px] text-[var(--color-ink-mid)]">
                Phase 3 of 5 — structure
              </p>
            </div>
            <div className="rounded border border-[var(--color-ink-hair)] bg-[var(--color-ink)]/60 p-3">
              <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--color-ink-dim)] mb-2">
                Cost estimation
              </p>
              <div className="flex items-end gap-1 h-10" aria-hidden="true">
                {[35, 55, 42, 70, 58, 82, 64].map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-sm bg-[var(--color-accent)]/70"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Materials */}
          <div className="rounded border border-[var(--color-ink-hair)] bg-[var(--color-ink)]/60 p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--color-ink-dim)]">
                Materials
              </p>
              <span className="font-mono text-[9px] text-[var(--color-accent-soft)]">
                View all
              </span>
            </div>
            <ul className="space-y-1.5">
              {materials.map((m) => (
                <li key={m.name} className="flex items-center gap-3">
                  <span className="text-[11px] text-[var(--color-ink-hi)] w-14">
                    {m.name}
                  </span>
                  <span className="flex-1 h-1 rounded-full bg-[#2a2a32] overflow-hidden">
                    <span
                      className="block h-full rounded-full bg-[var(--color-accent)]/60"
                      style={{ width: m.width }}
                    />
                  </span>
                  <span className="font-mono text-[9px] text-[var(--color-ink-dim)] w-24 text-right hidden sm:block">
                    {m.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between pt-1">
            <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--color-ink-dim)]">
              Recent projects
            </p>
            <span className="font-mono text-[9px] tracking-[0.16em] uppercase px-2 py-1 border border-[var(--color-ink-hair)] rounded text-[var(--color-ink-mid)]">
              Reports
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VecaiFeature() {
  return (
    <section
      id="vecai"
      aria-labelledby="vecai-heading"
      className="relative bg-[var(--color-ink-deep)] text-[var(--color-ink-hi)] overflow-hidden"
    >
      {/* Construction photograph — full-bleed backdrop */}
      <div className="absolute inset-0">
        <Image
          src="/images/drives.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[18%_center] opacity-70"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink-deep)] via-[var(--color-ink-deep)]/78 to-[var(--color-ink-deep)]/35"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink-deep)] via-transparent to-[var(--color-ink-deep)]/70"
          aria-hidden="true"
        />
      </div>

      <div className="wrap-wide relative z-10 py-24 md:py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
          {/* Copy */}
          <div className="max-w-xl">
            <ScrollReveal>
               <h2
                id="vecai-heading"
                className="display-xl mt-6 mb-6 text-[var(--color-ink-hi)]"
              >
                VECAI
              </h2>
              <p className="display-md text-[var(--color-ink-hi)] mb-6">
                Build smarter.
                <br />
                Build stronger.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-[var(--color-ink-mid)] mb-8 max-w-md">
                An AI-powered construction intelligence platform for planning,
                costing and coordination.
              </p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
               </ul>
              <Link href="#contact" className="btn btn--solid">
                View project
                <Arrow />
              </Link>
            </ScrollReveal>
          </div>

          {/* Product interface mockup */}
          <ScrollReveal mode="right" delay={150}>
            <VecaiMockup />
            <p className="meta mt-4 text-right">
              Interface concept — illustrative only
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
