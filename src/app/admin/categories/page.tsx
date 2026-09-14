"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch("/api/gallery/categories");
      const data = await res.json();
      setCategories(data);
    } catch {
      console.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  async function addCategory() {
    if (!newName.trim()) {
      setError("Name is required");
      return;
    }
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/gallery/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim() }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Failed to add category");
        setSaving(false);
        return;
      }
      setNewName("");
      await fetchCategories();
    } finally {
      setSaving(false);
    }
  }

  async function updateCategory(id: number, currentName: string) {
    const newName = prompt("Edit category name:", currentName);
    if (!newName || !newName.trim() || newName.trim() === currentName) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/gallery/categories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim() }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error ?? "Failed to update");
        return;
      }
      await fetchCategories();
    } finally {
      setSaving(false);
    }
  }

  async function deleteCategory(id: number, name: string) {
    if (!confirm(`Delete category "${name}"?`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/gallery/categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error ?? "Could not delete category");
        return;
      }
      await fetchCategories();
    } finally {
      setDeleting(null);
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
            <h1 className="text-2xl font-mono font-bold text-[var(--color-text-primary)]">
              Categories
            </h1>
            <p className="text-sm font-mono text-[var(--color-text-secondary)] mt-1">
              Manage gallery category labels
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/admin/gallery")}
              className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-mono text-[var(--color-text-secondary)] hover:border-sky-500 hover:text-sky-400 transition-colors"
            >
              Gallery Manager
            </button>
            <button
              onClick={() => router.push("/admin/config")}
              className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-mono text-[var(--color-text-secondary)] hover:border-sky-500 hover:text-sky-400 transition-colors"
            >
              Site Config
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

        {/* Add form */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-mono text-center">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <input
              type="text"
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && addCategory()}
              placeholder="e.g. UI Design"
              className="flex-1 px-4 py-2.5 rounded-lg bg-black border border-[var(--color-border)] text-[var(--color-text-primary)] font-mono placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-sky-500 transition-colors"
            />
            <button
              onClick={addCategory}
              disabled={saving}
              className="btn btn-primary text-sm"
            >
              {saving ? "…" : "Add Category"}
            </button>
          </div>
        </div>

        {/* List */}
        <div className="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
          {categories.length === 0 ? (
            <p className="text-center py-6 text-sm font-mono text-[var(--color-text-muted)]">
              No categories yet. Add one above.
            </p>
          ) : (
            <div className="space-y-2">
              {categories.map((cat) => (
                <CategoryRow
                  key={cat.id}
                  category={cat}
                  onUpdate={() => updateCategory(cat.id, cat.name)}
                  onDelete={() => deleteCategory(cat.id, cat.name)}
                  isDeleting={deleting === cat.id}
                  isSaving={saving}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CategoryRow({
  category,
  onUpdate,
  onDelete,
  isDeleting,
  isSaving,
}: {
  category: Category;
  onUpdate: () => void;
  onDelete: () => void;
  isDeleting: boolean;
  isSaving: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3 px-3 rounded-lg border border-[var(--color-border)]/50 hover:border-[var(--color-border)] transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-sky-500/60 shrink-0" />
        <span className="text-sm font-mono text-[var(--color-text-primary)]">
          {category.name}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onUpdate}
          disabled={isSaving}
          className="text-xs font-mono text-[var(--color-text-muted)] hover:text-sky-400 transition-colors px-2 py-1 rounded hover:bg-[var(--color-bg-tertiary)] disabled:opacity-50"
        >
          Rename
        </button>
        <button
          onClick={onDelete}
          disabled={isDeleting || isSaving}
          className="text-xs font-mono text-red-400 hover:bg-red-500/10 px-2 py-1 rounded transition-colors disabled:opacity-40"
        >
          {isDeleting ? "…" : "Delete"}
        </button>
      </div>
    </div>
  );
}
