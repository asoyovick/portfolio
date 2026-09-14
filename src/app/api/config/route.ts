import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  await requireAdmin();
  const db = await getDb();
  const rows = await db.query<{ key: string; value: string }>(
    "SELECT * FROM site_config"
  );
  const config: Record<string, string> = {};
  for (const row of rows) config[row.key] = row.value;
  return NextResponse.json(config);
}

export async function PATCH(req: NextRequest) {
  await requireAdmin();
  const db = await getDb();
  const body = await req.json();

  for (const [key, value] of Object.entries(body)) {
    await db.mutate(
      `INSERT INTO site_config (key, value) VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET value = $2`,
      [key, String(value)]
    );
  }

  const rows = await db.query<{ key: string; value: string }>(
    "SELECT * FROM site_config"
  );
  const config: Record<string, string> = {};
  for (const row of rows) config[row.key] = row.value;
  return NextResponse.json(config);
}
