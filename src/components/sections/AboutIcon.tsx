"use client";

import Image from "next/image";

interface ProfileIconFallbackProps {
  src?: string;
  alt?: string;
}

export function ProfileIconFallback({ src = "/profile.jpg", alt = "Profile photo" }: ProfileIconFallbackProps) {
  return (
    <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-[var(--honey-bronze)]/30 ring-offset-2 ring-offset-[var(--night-bordeaux)]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />

      </div>
  );
}
