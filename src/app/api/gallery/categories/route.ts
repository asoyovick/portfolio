import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  await requireAdmin();
  const db = await getDb();
  const categories = await db.query<{ id: number; name: string; created_at: string }>(
    "SELECT * FROM gallery_categories ORDER BY name ASC"
  );
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  await requireAdmin();
  const db = await getDb();
  const { name } = await req.json();
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  const trimmed = name.trim();
  try {
    const result = await db.mutate(
      "INSERT INTO gallery_categories (name) VALUES ($1) RETURNING id",
      [trimmed]
    );
    const category = await db.queryOne(
      "SELECT * FROM gallery_categories WHERE id = $1",
      [result.lastInsertId]
    );
    return NextResponse.json(category, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("duplicate")) {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 409 }
      );
    }
    throw err;
  }
}
