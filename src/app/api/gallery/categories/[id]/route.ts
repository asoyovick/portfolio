import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireAdmin();
  const { id } = await params;
  const db = getDb();
  const category = db
    .prepare("SELECT * FROM gallery_categories WHERE id = ?")
    .get(Number(id));
  if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(category);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireAdmin();
  const { id } = await params;
  const db = getDb();
  const { name } = await req.json();

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const trimmed = name.trim();
  const existing = db
    .prepare("SELECT * FROM gallery_photos WHERE category = ? AND id != 0")
    .get(trimmed);

  // Check if another category with this name exists
  const nameConflict = db
    .prepare("SELECT id FROM gallery_categories WHERE name = ? AND id != ?")
    .get(trimmed, Number(id)) as { id: number } | undefined;
  if (nameConflict) {
    return NextResponse.json(
      { error: "Category name already exists" },
      { status: 409 },
    );
  }

  db.prepare("UPDATE gallery_categories SET name = ? WHERE id = ?").run(
    trimmed,
    Number(id),
  );
  const category = db
    .prepare("SELECT * FROM gallery_categories WHERE id = ?")
    .get(Number(id));
  if (!category)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(category);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireAdmin();
  const { id } = await params;
  const db = getDb();

  // Check if category is in use
  const usage = db
    .prepare("SELECT COUNT(*) AS c FROM gallery_photos WHERE category = (SELECT name FROM gallery_categories WHERE id = ?)")
    .get(Number(id)) as { c: number };
  if (usage.c > 0) {
    return NextResponse.json(
      { error: "Cannot delete category that is in use by photos" },
      { status: 409 },
    );
  }

  const result = db
    .prepare("DELETE FROM gallery_categories WHERE id = ?")
    .run(Number(id));
  if (result.changes === 0)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
