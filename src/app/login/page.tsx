"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Login failed");
        setLoading(false);
        return;
      }

      router.push("/admin");
    } catch {
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--color-ink-deep)] px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm py-10"
        aria-label="Admin login"
      >
        <p className="label mb-6">Victor Ouma — Admin</p>
        <h1 className="display-md text-[var(--color-ink-hi)] mb-10">
          Sign in
        </h1>

        {error && (
          <div
            className="mb-6 px-4 py-3 border border-red-500/30 bg-red-500/10 text-red-300 text-sm"
            role="alert"
          >
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block meta mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className="w-full bg-transparent border-b border-[var(--color-ink-hair)] focus:border-[var(--color-accent-soft)] text-[var(--color-ink-hi)] py-2.5 text-base outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block meta mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full bg-transparent border-b border-[var(--color-ink-hair)] focus:border-[var(--color-accent-soft)] text-[var(--color-ink-hi)] py-2.5 text-base outline-none transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn--solid w-full mt-2 disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </form>
    </main>
  );
}
