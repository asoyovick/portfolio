import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  await requireAdmin();
  const db = getDb();
  const photos = db
    .prepare("SELECT * FROM gallery_photos ORDER BY order_index ASC, id ASC")
    .all();
  return NextResponse.json(photos);
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  const db = getDb();

  const maxOrder = db
    .prepare("SELECT MAX(order_index) AS m FROM gallery_photos")
    .get() as { m: number | null };

  const body = await req.json();
  const { title, category, image_path, featured } = body;

  const result = db
    .prepare(
      "INSERT INTO gallery_photos (title, category, image_path, order_index, featured) VALUES (?, ?, ?, ?, ?)",
    )
    .run(title, category, image_path, (maxOrder.m ?? -1) + 1, featured ? 1 : 0);

  const photo = db.prepare("SELECT * FROM gallery_photos WHERE id = ?").get(result.lastInsertRowid);
  return NextResponse.json(photo, { status: 201 });
}
