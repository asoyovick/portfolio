"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => setUser(data.user ?? null))
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[var(--color-text-muted)] font-mono text-sm">Loading...</div>
      </div>
    );
  }

  if (!user) {
    router.push("/admin/login");
    return null;
  }

  const navItems = [
    {
      href: "/admin/gallery",
      label: "Gallery Manager",
      desc: "Upload, edit, and organize photos",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      ),
    },
    {
      href: "/admin/categories",
      label: "Categories",
      desc: "Manage gallery category labels",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path d="M4 6h16M4 12h16M4 18h10" />
        </svg>
      ),
    },
    {
      href: "/admin/config",
      label: "Site Config",
      desc: "Edit global site settings",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-mono font-bold text-[var(--color-text-primary)]">
              Admin
            </h1>
            <p className="text-sm font-mono text-[var(--color-text-secondary)] mt-1">
              Welcome back, {user.username}
            </p>
          </div>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg border border-red-500/30 text-sm font-mono text-red-400 hover:bg-red-500/10 transition-colors"
            >
              Logout
            </button>
          </form>
        </div>

        {/* Nav cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex flex-col gap-3 p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-blue-500)]/40 hover:bg-[var(--color-blue-500)]/5 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--color-blue-500)]/10 flex items-center justify-center text-[var(--color-blue-500)] group-hover:bg-[var(--color-blue-500)] group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <div>
                <h2 className="text-base font-mono font-semibold text-[var(--color-text-primary)]">
                  {item.label}
                </h2>
                <p className="text-xs font-mono text-[var(--color-text-muted)] mt-0.5">
                  {item.desc}
                </p>
              </div>
              <span className="text-xs font-mono text-[var(--color-blue-500)] opacity-0 group-hover:opacity-100 transition-opacity">
                Open →
              </span>
            </a>
          ))}
        </div>

        {/* Info strip */}
        <div className="mt-8 p-4 rounded-xl border border-[var(--color-border)]/50 bg-[var(--color-bg-secondary)]/50">
          <p className="text-sm font-mono text-[var(--color-text-muted)]">
            Use the links above to manage your portfolio content.
          </p>
        </div>
      </div>
    </div>
  );
}
