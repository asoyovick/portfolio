import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  await requireAdmin();
  const db = getDb();
  const categories = db
    .prepare("SELECT * FROM gallery_categories ORDER BY name ASC")
    .all();
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  await requireAdmin();
  const db = getDb();
  const { name } = await req.json();
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  const trimmed = name.trim();
  try {
    const result = db
      .prepare("INSERT INTO gallery_categories (name) VALUES (?)")
      .run(trimmed);
    const category = db
      .prepare("SELECT * FROM gallery_categories WHERE id = ?")
      .get(result.lastInsertRowid);
    return NextResponse.json(category, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("UNIQUE")) {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 409 },
      );
    }
    throw err;
  }
}
