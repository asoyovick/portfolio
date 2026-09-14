import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const db = getDb();
  const photo = db
    .prepare("SELECT id, title, category, image_path, featured FROM gallery_photos WHERE id = ?")
    .get(Number(id));

  if (!photo) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(photo);
}
