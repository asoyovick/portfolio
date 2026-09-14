import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = await getDb();
  const photo = await db.queryOne<{
    id: number;
    title: string;
    category: string;
    image_path: string;
    featured: number;
  }>(
    "SELECT id, title, category, image_path, featured FROM gallery_photos WHERE id = $1",
    [Number(id)]
  );

  if (!photo) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(photo);
}
