import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const db = getDb();
  let query = "SELECT id, title, category, image_path, featured FROM gallery_photos";
  const params: (string | undefined)[] = [];

  if (category) {
    query += " WHERE category = ? ORDER BY order_index ASC, id ASC";
    params.push(category);
  } else {
    query += " ORDER BY order_index ASC, id ASC";
  }

  const photos = db.prepare(query).all(...params);
  return NextResponse.json(photos);
}
