import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const db = await getDb();
  const category = await db.queryOne(
    "SELECT * FROM gallery_categories WHERE id = $1",
    [Number(id)]
  );
  if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(category);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const db = await getDb();
  const { name } = await req.json();

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const trimmed = name.trim();

  const nameConflict = await db.queryOne<{ id: number }>(
    "SELECT id FROM gallery_categories WHERE name = $1 AND id != $2",
    [trimmed, Number(id)]
  );
  if (nameConflict) {
    return NextResponse.json(
      { error: "Category name already exists" },
      { status: 409 }
    );
  }

  await db.mutate(
    "UPDATE gallery_categories SET name = $1 WHERE id = $2",
    [trimmed, Number(id)]
  );
  const category = await db.queryOne(
    "SELECT * FROM gallery_categories WHERE id = $1",
    [Number(id)]
  );
  if (!category)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(category);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const db = await getDb();

  const usage = (
    await db.query<{ c: number }>(
      "SELECT COUNT(*) AS c FROM gallery_photos WHERE category = (SELECT name FROM gallery_categories WHERE id = $1)",
      [Number(id)]
    )
  )[0]?.c ?? 0;
  if (usage > 0) {
    return NextResponse.json(
      { error: "Cannot delete category that is in use by photos" },
      { status: 409 }
    );
  }

  const result = await db.mutate(
    "DELETE FROM gallery_categories WHERE id = $1",
    [Number(id)]
  );
  if (result.rowCount === 0)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
