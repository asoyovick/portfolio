import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();
  const photos = db
    .prepare("SELECT id, title, category, image_path, featured FROM gallery_photos ORDER BY order_index ASC, id ASC")
    .all();
  return NextResponse.json(photos);
}
