"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useEffect, useState } from "react";

/*
 * Self-replicating ASCII marquee — mirrors the Python script behaviour:
 * the name "Victor" (as ASCII art) marches from left to right forever.
 */
function SelfReplicatingMarquee() {
  // ASCII art for "Victor" (standard figlet style, 8 lines tall)
  const asciiArt = `
   ████████████   ██████  ██████  ██████  ████████   
   ██            ██    ██ ██   ██ ██   ██ ██        
   ██████████    ██    ██ ██████  ██████  ████████   
   ██            ██    ██ ██   ██ ██   ██ ██        
   ██            ██    ██ ██   ██ ██   ██ ██        
   ██            ██    ██ ██   ██ ██   ██ ██        
   ████████████   ██████  ██████  ██████  ████████   
   `;
  const lines = asciiArt.trim().split("\n");
  const screenWidth = 36;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % (screenWidth + lines[0].length));
    }, 90);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-block whitespace-pre font-mono text-sky-300 tracking-tight leading-none overflow-hidden">
      {lines.map((line, i) => (
        <div
          key={i}
          className="inline-block whitespace-pre leading-[0.95] sm:leading-[1]"
          style={{ marginRight: 0 }}
        >
          {Array.from({ length: screenWidth }).map((_, s) => (
            <span
              key={s}
              className="inline-block w-3 sm:w-4 align-middle"
            >
              {s === offset
                ? line
                : "&nbsp;"}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

const terminalLines = [
  { type: "prompt", text: `victor@ubuntu:~$` },
  { type: "command", text: `echo "Hello, I'm Victor Ouma"` },
  { type: "output", text: `Hello, I'm Victor Ouma` },
  { type: "blank" },
  { type: "prompt", text: `victor@ubuntu:~$` },
  { type: "command", text: `cat /about` },
  { type: "output", text: `Software Developer · AI Builder · Digital Creator` },
  { type: "blank" },
  { type: "prompt", text: `victor@ubuntu:~$` },
  { type: "command", text: `cat /what-i-do` },
  { type: "output", text: `I build digital products that turn ideas and real-world problems into useful technology.` },
  { type: "blank" },
  { type: "prompt", text: `victor@ubuntu:~$` },
  { type: "cursor", text: `_` },
];export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Terminal window - full height */}
      <div className="w-full h-full flex flex-col bg-black">
        {/* Terminal header bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-black border-b border-blue-900/30 flex-shrink-0">
          {/* Traffic lights */}
          <div className="flex gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500/80" />
            <div className="w-4 h-4 rounded-full bg-yellow-500/80" />
            <div className="w-4 h-4 rounded-full bg-blue-500/80" />
          </div>
          {/* Terminal title */}
          <span className="text-sm text-blue-400/60 font-mono ml-2">
            victor@ubuntu — bash
          </span>
          {/* Spacer */}
          <div className="flex-1" />
        </div>

        {/* Terminal content - fills remaining space */}
        <div className="flex-1 p-8 sm:p-12 lg:p-16 bg-black font-mono flex flex-col justify-center">
          {/* Self-replicating ASCII marquee — "Victor" moves left → right */}
          <div className="mb-10 lg:mb-12 flex justify-center">
            <SelfReplicatingMarquee />
          </div>

          {/* Terminal output lines */}
          <div className="space-y-2">
            {terminalLines.map((line, index) => (
              <div
                key={index}
                className="flex items-center text-base sm:text-lg md:text-xl lg:text-2xl"
              >
                {line.type === "prompt" && (
                  <span className="text-blue-400 mr-3">{line.text}</span>
                )}
                {line.type === "command" && (
                  <span className="text-blue-300">{line.text}</span>
                )}
                {line.type === "output" && (
                  <span className="text-blue-200">{line.text}</span>
                )}
                {line.type === "blank" && (
                  <span className="block h-6 sm:h-8 md:h-10" />
                )}
                {line.type === "cursor" && (
                  <span className="text-blue-400 inline-block w-3 h-6 sm:h-8 bg-blue-400 animate-blink" />
                )}
              </div>
            ))}
          </div>

          {/* Command input simulation - just the prompt + cursor */}
          <div className="mt-8 sm:mt-10 flex items-center text-base sm:text-lg md:text-xl lg:text-2xl">
            <span className="text-blue-400 mr-3">victor@ubuntu:~$</span>
            <span className="text-blue-400 animate-blink inline-block w-3 h-6 sm:h-8" />
          </div>
        </div>

        {/* Terminal bottom bar */}
        <div className="px-4 py-2 bg-black border-t border-blue-900/30 flex items-center justify-between text-sm text-blue-400/60 font-mono flex-shrink-0">
          <span className="flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400">
              <circle cx="12" cy="12" r="10" />
            </svg>
            ubuntu
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-blue-400/50 animate-bounce">
        <span className="text-sm font-mono">↓ scroll ↓</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}


