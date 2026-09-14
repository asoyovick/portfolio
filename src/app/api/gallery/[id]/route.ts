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
  const photo = await db.queryOne(
    "SELECT * FROM gallery_photos WHERE id = $1",
    [Number(id)]
  );
  if (!photo) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(photo);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const db = await getDb();
  const body = await req.json();

  const existing = await db.queryOne(
    "SELECT * FROM gallery_photos WHERE id = $1",
    [Number(id)]
  );
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const sets: string[] = [];
  const values: unknown[] = [];

  if (body.title !== undefined) { sets.push("title = $1"); values.push(body.title); }
  if (body.category !== undefined) { sets.push("category = $2"); values.push(body.category); }
  if (body.image_path !== undefined) { sets.push("image_path = $3"); values.push(body.image_path); }
  if (body.order_index !== undefined) { sets.push("order_index = $4"); values.push(body.order_index); }
  if (body.featured !== undefined) { sets.push("featured = $5"); values.push(body.featured ? 1 : 0); }

  if (sets.length === 0) return NextResponse.json(existing);

  // Re-number params since we're using $1, $2, etc.
  const updatedValues = values.map((v, i) => `$${i + 1}`);
  await db.mutate(
    `UPDATE gallery_photos SET ${sets.join(", ")} WHERE id = $${values.length + 1}`,
    [...values, Number(id)]
  );

  const photo = await db.queryOne(
    "SELECT * FROM gallery_photos WHERE id = $1",
    [Number(id)]
  );
  return NextResponse.json(photo);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const db = await getDb();
  const result = await db.mutate("DELETE FROM gallery_photos WHERE id = $1", [Number(id)]);
  if (result.rowCount === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
