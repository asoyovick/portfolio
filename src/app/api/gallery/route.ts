import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  await requireAdmin();
  const db = await getDb();
  const photos = await db.query<{
    id: number;
    title: string;
    category: string;
    image_path: string;
    order_index: number;
    featured: number;
    created_at: string;
  }>("SELECT * FROM gallery_photos ORDER BY order_index ASC, id ASC");
  return NextResponse.json(photos);
}

export async function POST(req: NextRequest) {
  await requireAdmin();
  const db = await getDb();

  const { title, category, image_path, featured } = await req.json();

  const maxOrder = (
    await db.query<{ m: number | null }>(
      "SELECT MAX(order_index) AS m FROM gallery_photos"
    )
  )[0]?.m ?? -1;

  const result = await db.mutate(
    `INSERT INTO gallery_photos (title, category, image_path, order_index, featured)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id`,
    [title, category, image_path, maxOrder + 1, featured ? 1 : 0]
  );

  const photo = await db.queryOne(
    "SELECT * FROM gallery_photos WHERE id = $1",
    [result.lastInsertId]
  );

  return NextResponse.json(photo, { status: 201 });
}
