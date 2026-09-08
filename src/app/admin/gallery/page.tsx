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

export default function GalleryManagerPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load photos on mount
  useEffect(() => {
    fetchPhotos();
  }, []);

  async function fetchPhotos() {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setPhotos(data);
    } catch {
      console.error("Failed to load photos");
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      // Only allow images
      if (!file.type.startsWith("image/")) continue;

      const formData = new FormData();
      formData.append("file", file);

      // Upload to public/upload endpoint (we'll create a simple upload route)
      const uploadRes = await fetch("/api/gallery/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        console.error("Upload failed for", file.name);
        continue;
      }

      const { path } = await uploadRes.json();

      // Create gallery entry
      const title = file.name.replace(/\.[^/.]+$/, "");
      const formDataMeta = new FormData();
      formDataMeta.append("title", title);
      formDataMeta.append("category", "Web Application");
      formDataMeta.append("image_path", path);
      formDataMeta.append("featured", "false");

      await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category: "Web Application",
          image_path: path,
          featured: false,
        }),
      });

      await fetchPhotos();
    }

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this photo?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      setPhotos((prev) => prev.filter((p) => p.id !== id));
    } finally {
      setDeleting(null);
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

  function handleSortDrop(photoId: number, newIndex: number) {
    setPhotos((prev) => {
      const updated = [...prev];
      const moved = updated.find((p) => p.id === photoId);
      if (!moved) return prev;
      const filtered = updated.filter((p) => p.id !== photoId);
      filtered.splice(newIndex, 0, moved);
      return filtered;
    });

    // Update order_index in DB
    const allIds = photos.map((p) => p.id);
    const reorderedIds = [
      ...allIds.filter((id) => id !== photoId).slice(0, newIndex),
      photoId,
      ...allIds.filter((id) => id !== photoId).slice(newIndex),
    ];

    Promise.all(
      reorderedIds.map(async (id, idx) => {
        await fetch(`/api/gallery/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_index: idx }),
        });
      }),
    ).then(() => fetchPhotos());
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-mono font-bold text-[var(--color-text-primary)]">Gallery Manager</h1>
            <p className="text-sm font-mono text-[var(--color-text-secondary)] mt-1">
              Upload and manage gallery photos
            </p>
          </div>
          <div className="flex gap-3">
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
        {loading ? (
          <div className="text-center py-12 text-[var(--color-text-muted)] font-mono text-sm">
            Loading photos...
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-12 text-[var(--color-text-muted)] font-mono text-sm">
            No photos yet. Upload some images above.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="group relative rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-card)]"
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text/plain", String(photo.id))}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const targetId = Number(e.currentTarget.dataset.id);
                  if (targetId && targetId !== photo.id) {
                    handleSortDrop(photo.id, index);
                  }
                }}
                data-id={photo.id}
              >
                {/* Thumbnail */}
                <div className="aspect-[4/3] bg-black relative flex items-center justify-center">
                  {photo.image_path.startsWith("http") ? (
                    <img
                      src={photo.image_path}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={`/uploads/${photo.image_path}`}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                  )}
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
                <div className="absolute top-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleDelete(photo.id)}
                    disabled={deleting === photo.id}
                    className="px-2 py-1 text-[10px] font-mono rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 disabled:opacity-50"
                  >
                    {deleting === photo.id ? "…" : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
