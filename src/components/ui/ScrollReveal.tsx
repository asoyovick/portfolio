"use client";

import { useEffect, useRef, type ReactNode, type ElementType, type Ref } from "react";

type RevealMode = "up" | "left" | "right" | "fade" | "clip";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Entry direction. `clip` does a top-down curtain wipe — best on images. */
  mode?: RevealMode;
  /** Stagger delay in ms. */
  delay?: number;
  /** Render as a different element (e.g. "li" inside an ordered list). */
  as?: ElementType;
}

export default function ScrollReveal({
  children,
  className = "",
  mode = "up",
  delay = 0,
  as = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = as as ElementType;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Reveal everything immediately when reduced motion is preferred.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.classList.add("is-revealed");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as Ref<HTMLElement>}
      data-reveal={mode}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
