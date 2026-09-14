import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const db = await getDb();
  let query = "SELECT id, title, category, image_path, featured FROM gallery_photos";
  const params: (string | undefined)[] = [];

  if (category) {
    query += " WHERE category = $1 ORDER BY order_index ASC, id ASC";
    params.push(category);
  } else {
    query += " ORDER BY order_index ASC, id ASC";
  }

  const photos = await db.query<{
    id: number;
    title: string;
    category: string;
    image_path: string;
    featured: number;
  }>(query, params.length > 0 ? params as unknown[] : undefined);
  return NextResponse.json(photos);
}
