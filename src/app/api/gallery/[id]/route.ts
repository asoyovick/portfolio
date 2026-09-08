import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const db = getDb();
  const photo = db.prepare("SELECT * FROM gallery_photos WHERE id = ?").get(Number(id));
  if (!photo) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(photo);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const db = getDb();
  const body = await req.json();

  const existing = db.prepare("SELECT * FROM gallery_photos WHERE id = ?").get(Number(id));
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const sets: string[] = [];
  const values: unknown[] = [];

  if (body.title !== undefined) { sets.push("title = ?"); values.push(body.title); }
  if (body.category !== undefined) { sets.push("category = ?"); values.push(body.category); }
  if (body.image_path !== undefined) { sets.push("image_path = ?"); values.push(body.image_path); }
  if (body.order_index !== undefined) { sets.push("order_index = ?"); values.push(body.order_index); }
  if (body.featured !== undefined) { sets.push("featured = ?"); values.push(body.featured ? 1 : 0); }

  if (sets.length === 0) return NextResponse.json(existing);

  values.push(Number(id));
  db.prepare(`UPDATE gallery_photos SET ${sets.join(", ")} WHERE id = ?`).run(...values);
  const photo = db.prepare("SELECT * FROM gallery_photos WHERE id = ?").get(Number(id));
  return NextResponse.json(photo);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const db = getDb();
  const result = db.prepare("DELETE FROM gallery_photos WHERE id = ?").run(Number(id));
  if (result.changes === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
