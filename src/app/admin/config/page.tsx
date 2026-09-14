"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Config {
  siteName?: string;
  siteDescription?: string;
  email?: string;
  heroSubtitle?: string;
}

export default function ConfigPage() {
  const [config, setConfig] = useState<Config>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchConfig();
  }, []);

  async function fetchConfig() {
    try {
      const res = await fetch("/api/config");
      const data = await res.json();
      setConfig(data);
    } catch {
      console.error("Failed to load config");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/config", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (!res.ok) throw new Error("Save failed");
      setMessage("Config saved");
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage("Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[var(--color-text-muted)] font-mono text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-2xl mx-auto">
{/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-mono font-bold text-[var(--color-text-primary)]">Site Config</h1>
            <p className="text-sm font-mono text-[var(--color-text-secondary)] mt-1">
              Edit global site settings
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/admin/gallery")}
              className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-mono text-[var(--color-text-secondary)] hover:border-sky-500 hover:text-sky-400 transition-colors"
            >
              Gallery
            </button>
            <button
              onClick={() => router.push("/admin/categories")}
              className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-mono text-[var(--color-text-secondary)] hover:border-sky-500 hover:text-sky-400 transition-colors"
            >
              Categories
            </button>
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg border border-red-500/30 text-sm font-mono text-red-400 hover:bg-red-500/10 transition-colors"
              >
                Logout
              </button>
            </form>
          </div>
        </div>

        {/* Config form */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 space-y-5">
          {message && (
            <div
              className={`p-3 rounded-lg text-sm font-mono text-center ${
                message === "Config saved"
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}
            >
              {message}
            </div>
          )}

          <Field
            label="Site Name"
            value={config.siteName ?? ""}
            onChange={(v) => setConfig((c) => ({ ...c, siteName: v }))}
            placeholder="Victor Ouma"
          />

          <Field
            label="Site Description"
            value={config.siteDescription ?? ""}
            onChange={(v) => setConfig((c) => ({ ...c, siteDescription: v }))}
            placeholder="Software Developer · AI Builder · Digital Creator"
          />

          <Field
            label="Contact Email"
            type="email"
            value={config.email ?? ""}
            onChange={(v) => setConfig((c) => ({ ...c, email: v }))}
            placeholder="hello@victor.dev"
          />

          <Field
            label="Hero Subtitle"
            value={config.heroSubtitle ?? ""}
            onChange={(v) => setConfig((c) => ({ ...c, heroSubtitle: v }))}
            placeholder="Building things that matter."
            hint="Shown on the hero section"
          />

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full btn btn-primary text-sm py-2.5"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <p className="mt-6 text-xs font-mono text-[var(--color-text-muted)] text-center">
          Changes are stored in the SQLite database and will take effect immediately.
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-mono text-[var(--color-text-secondary)] mb-1.5">
        {label}
      </label>
      {hint && (
        <p className="text-xs font-mono text-[var(--color-text-muted)] mb-1.5">{hint}</p>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg bg-black border border-[var(--color-border)] text-[var(--color-text-primary)] font-mono placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-sky-500 transition-colors"
        placeholder={placeholder}
      />
    </div>
  );
}
