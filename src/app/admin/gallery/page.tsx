"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface Photo {
  id: number;
  title: string;
  category: string;
  image_path: string;
  order_index: number;
  featured: number;
}

interface Category {
  id: number;
  name: string;
}

type Tab = "photos" | "categories";

export default function GalleryManagerPage() {
  const [activeTab, setActiveTab] = useState<Tab>("photos");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [savingPhoto, setSavingPhoto] = useState(false);
  const [addingCategory, setAddingCategory] = useState(false);
  const [savingCategory, setSavingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    try {
      const [photosRes, catsRes] = await Promise.all([
        fetch("/api/gallery"),
        fetch("/api/gallery/categories"),
      ]);
      const [photosData, catsData] = await Promise.all([
        photosRes.json(),
        catsRes.json(),
      ]);
      setPhotos(photosData);
      setCategories(catsData);
    } catch {
      console.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;

      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/gallery/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        console.error("Upload failed for", file.name);
        continue;
      }

      const { path } = await uploadRes.json();

      const title = file.name.replace(/\\.[^/.]+$/, "");
      const defaultCategory = categories[0]?.name ?? "Web Application";

      await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category: defaultCategory,
          image_path: path,
          featured: false,
        }),
      });
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
    await fetchAll();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this photo?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      await fetchAll();
    } finally {
      setDeleting(null);
    }
  }

  async function savePhotoEdits(
    id: number,
    updates: { title?: string; category?: string; featured?: boolean },
  ) {
    setSavingPhoto(true);
    try {
      await fetch(`/api/gallery/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      await fetchAll();
    } finally {
      setSavingPhoto(false);
      setEditingPhoto(null);
    }
  }

  function handleDrag(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const input = fileInputRef.current;
      if (input) {
        const dt = new DataTransfer();
        for (const f of Array.from(files)) dt.items.add(f);
        input.files = dt.files;
        handleFileUpload({ target: input } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  }

  async function handleSortDrop(photoId: number, newIndex: number) {
    const allIds = photos.map((p) => p.id);
    const reorderedIds = [
      ...allIds.filter((id) => id !== photoId).slice(0, newIndex),
      photoId,
      ...allIds.filter((id) => id !== photoId).slice(newIndex),
    ];

    await Promise.all(
      reorderedIds.map(async (id, idx) => {
        await fetch(`/api/gallery/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_index: idx }),
        });
      }),
    );
    await fetchAll();
  }

  async function addCategory() {
    if (!newCategoryName.trim()) {
      setCategoryError("Name is required");
      return;
    }
    setCategoryError("");
    setSavingCategory(true);
    try {
      const res = await fetch("/api/gallery/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });
      if (!res.ok) {
        const data = await res.json();
        setCategoryError(data.error ?? "Failed to add category");
        setSavingCategory(false);
        return;
      }
      setNewCategoryName("");
      await fetchAll();
    } finally {
      setSavingCategory(false);
    }
  }

  async function deleteCategory(id: number, name: string) {
    if (!confirm(`Delete category "${name}"?`)) return;
    const res = await fetch(`/api/gallery/categories/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error ?? "Could not delete category");
      return;
    }
    await fetchAll();
  }

  async function updateCategory(id: number, name: string) {
    setSavingCategory(true);
    try {
      const res = await fetch(`/api/gallery/categories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error ?? "Failed to update category");
        return;
      }
      await fetchAll();
    } finally {
      setSavingCategory(false);
    }
  }

  // ── Loading state ──
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[var(--color-text-muted)] font-mono text-sm">Loading...</div>
      </div>
    );
  }

  // ── Header ──
  const header = (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-mono font-bold text-[var(--color-text-primary)]">
          Gallery Manager
        </h1>
        <p className="text-sm font-mono text-[var(--color-text-secondary)] mt-1">
          {activeTab === "photos"
            ? "Upload and manage gallery photos"
            : "Manage gallery categories"}
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => router.push("/admin/categories")}
          className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-mono text-[var(--color-text-secondary)] hover:border-sky-500 hover:text-sky-400 transition-colors"
        >
          Categories
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
  );

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-5xl mx-auto">
        {header}

        {/* Tab switcher */}
        <div className="flex gap-1 mb-6 border-b border-[var(--color-border)]">
          <button
            onClick={() => setActiveTab("photos")}
            className={`px-4 py-2 text-sm font-mono border-b-2 transition-colors ${
              activeTab === "photos"
                ? "border-sky-500 text-sky-400"
                : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
            }`}
          >
            Photos ({photos.length})
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`px-4 py-2 text-sm font-mono border-b-2 transition-colors ${
              activeTab === "categories"
                ? "border-sky-500 text-sky-400"
                : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
            }`}
          >
            Categories ({categories.length})
          </button>
        </div>

        {/* ── Photos tab ── */}
        {activeTab === "photos" && (
          <>
            {/* Upload area */}
            <div
              className={`relative rounded-2xl border-2 border-dashed p-12 text-center transition-colors mb-8 ${
                dragActive
                  ? "border-sky-500 bg-sky-500/5"
                  : "border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-sky-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-mono text-[var(--color-text-primary)]">
                    Drag & drop images here
                  </p>
                  <p className="text-xs font-mono text-[var(--color-text-muted)] mt-1">
                    or click to browse
                  </p>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-secondary text-sm"
                >
                  Choose Files
                </button>
              </div>
            </div>

            {/* Photo grid */}
            {photos.length === 0 ? (
              <div className="text-center py-12 text-[var(--color-text-muted)] font-mono text-sm">
                No photos yet. Upload some images above.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    index={index}
                    onDelete={() => handleDelete(photo.id)}
                    isDeleting={deleting === photo.id}
                    onEdit={() => setEditingPhoto(photo)}
                    categories={categories}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* ── Categories tab ── */}
        {activeTab === "categories" && (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 space-y-6">
            {/* Add category form */}
            <div className="flex gap-3">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => {
                  setNewCategoryName(e.target.value);
                  setCategoryError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && addCategory()}
                placeholder="New category name"
                className="flex-1 px-4 py-2.5 rounded-lg bg-black border border-[var(--color-border)] text-[var(--color-text-primary)] font-mono placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-sky-500 transition-colors"
              />
              <button
                onClick={addCategory}
                disabled={savingCategory}
                className="btn btn-primary text-sm"
              >
                {savingCategory ? "…" : "Add Category"}
              </button>
            </div>
            {categoryError && (
              <p className="text-sm text-red-400 font-mono">{categoryError}</p>
            )}

            {/* Category list */}
            {categories.length === 0 ? (
              <p className="text-sm text-[var(--color-text-muted)] font-mono">
                No categories yet.
              </p>
            ) : (
              <div className="space-y-2">
                {categories.map((cat) => {
                  const inUse = photos.some((p) => p.category === cat.name);
                  return (
                    <div
                      key={cat.id}
                      className="flex items-center justify-between py-2 px-3 rounded-lg border border-[var(--color-border)]/50 hover:border-[var(--color-border)] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-sky-500/60" />
                        <span className="text-sm font-mono text-[var(--color-text-primary)]">
                          {cat.name}
                        </span>
                        {inUse && (
                          <span className="text-[10px] font-mono text-[var(--color-text-muted)] bg-[var(--color-bg-tertiary)] px-2 py-0.5 rounded">
                            {photos.filter((p) => p.category === cat.name).length} photos
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const newName = prompt("Edit category name:", cat.name);
                            if (newName && newName.trim() && newName.trim() !== cat.name) {
                              updateCategory(cat.id, newName.trim());
                            }
                          }}
                          disabled={savingCategory}
                          className="text-xs font-mono text-[var(--color-text-muted)] hover:text-sky-400 transition-colors px-2 py-1 rounded hover:bg-[var(--color-bg-tertiary)] disabled:opacity-50"
                        >
                          Rename
                        </button>
                        <button
                          onClick={() => deleteCategory(cat.id, cat.name)}
                          disabled={inUse || savingCategory}
                          className="text-xs font-mono text-red-400 hover:bg-red-500/10 px-2 py-1 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {inUse ? "In use" : "Delete"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Photo edit modal */}
        {editingPhoto && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && setEditingPhoto(null)}
          >
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 w-full max-w-lg space-y-5">
              <h2 className="text-lg font-mono font-semibold text-[var(--color-text-primary)]">
                Edit Photo
              </h2>

              {/* Thumbnail */}
              <div className="aspect-[4/3] bg-black rounded-lg overflow-hidden">
                <img
                  src={
                    editingPhoto.image_path.startsWith("http")
                      ? editingPhoto.image_path
                      : editingPhoto.image_path.startsWith("uploads/")
                        ? `/${editingPhoto.image_path}`
                        : `/uploads/${editingPhoto.image_path}`
                  }
                  alt={editingPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-mono text-[var(--color-text-secondary)] mb-1.5">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editingPhoto.title}
                    onChange={(e) =>
                      setEditingPhoto({ ...editingPhoto, title: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg bg-black border border-[var(--color-border)] text-[var(--color-text-primary)] font-mono placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono text-[var(--color-text-secondary)] mb-1.5">
                    Category
                  </label>
                  <select
                    value={editingPhoto.category}
                    onChange={(e) =>
                      setEditingPhoto({ ...editingPhoto, category: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg bg-black border border-[var(--color-border)] text-[var(--color-text-primary)] font-mono focus:outline-none focus:border-sky-500 transition-colors"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      className={`w-10 h-5 rounded-full transition-colors ${
                        editingPhoto.featured
                          ? "bg-sky-500"
                          : "bg-[var(--color-bg-tertiary)]"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          editingPhoto.featured ? "translate-x-5" : "translate-x-1"
                        }`}
                      />
                    </div>
                    <span className="text-sm font-mono text-[var(--color-text-secondary)]">
                      Featured
                    </span>
                  </label>
                  <button
                    onClick={() =>
                      savePhotoEdits(editingPhoto.id, {
                        title: editingPhoto.title,
                        category: editingPhoto.category,
                        featured: !editingPhoto.featured,
                      })
                    }
                    disabled={savingPhoto}
                    className="text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors disabled:opacity-50"
                  >
                    {savingPhoto ? "Saving…" : "Toggle"}
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setEditingPhoto(null)}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-[var(--color-border)] text-sm font-mono text-[var(--color-text-secondary)] hover:border-sky-500 hover:text-sky-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    savePhotoEdits(editingPhoto.id, {
                      title: editingPhoto.title,
                      category: editingPhoto.category,
                    })
                  }
                  disabled={savingPhoto}
                  className="flex-1 btn btn-primary text-sm"
                >
                  {savingPhoto ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PhotoCard({
  photo,
  index,
  onDelete,
  isDeleting,
  onEdit,
  categories,
}: {
  photo: Photo;
  index: number;
  onDelete: () => void;
  isDeleting: boolean;
  onEdit: () => void;
  categories: Category[];
}) {
  return (
    <div
      className="group relative rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-card)]"
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/plain", String(photo.id))}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const targetId = Number(e.currentTarget.dataset.id);
        if (targetId && targetId !== photo.id) {
          // handled by parent via onDrop on grid — simplified here
        }
      }}
      data-id={photo.id}
    >
      {/* Thumbnail */}
      <div className="aspect-[4/3] bg-black relative flex items-center justify-center">
        <img
          src={
            photo.image_path.startsWith("http")
              ? photo.image_path
              : photo.image_path.startsWith("uploads/")
                ? `/${photo.image_path}`
                : `/uploads/${photo.image_path}`
          }
          alt={photo.title}
          className="w-full h-full object-cover"
        />
        {photo.featured ? (
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-sky-500 text-white text-[10px] font-mono rounded">
            Featured
          </div>
        ) : null}
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-sm font-mono font-semibold text-[var(--color-text-primary)] truncate">
          {photo.title}
        </h3>
        <p className="text-xs font-mono text-[var(--color-text-muted)] mt-0.5">
          {photo.category}
        </p>
      </div>

      {/* Actions */}
      <div className="absolute top-2 left-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="flex-1 px-2 py-1 text-[10px] font-mono rounded bg-[var(--color-bg-primary)]/80 text-[var(--color-text-secondary)] hover:bg-sky-500/20 hover:text-sky-400 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          disabled={isDeleting}
          className="px-2 py-1 text-[10px] font-mono rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 disabled:opacity-50"
        >
          {isDeleting ? "…" : "Del"}
        </button>
      </div>
    </div>
  );
}
