import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  await requireAdmin();
  const db = getDb();
  const rows = db.prepare("SELECT * FROM site_config").all() as { key: string; value: string }[];
  const config: Record<string, string> = {};
  for (const row of rows) config[row.key] = row.value;
  return NextResponse.json(config);
}

export async function PATCH(req: NextRequest) {
  await requireAdmin();
  const db = getDb();
  const body = await req.json();

  const upsert = db.prepare(
    "INSERT INTO site_config (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
  );

  for (const [key, value] of Object.entries(body)) {
    upsert.run(key, String(value));
  }

  // Return updated config
  const rows = db.prepare("SELECT * FROM site_config").all() as { key: string; value: string }[];
  const config: Record<string, string> = {};
  for (const row of rows) config[row.key] = row.value;
  return NextResponse.json(config);
}
