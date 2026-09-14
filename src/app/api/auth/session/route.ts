import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const cookieStore = await import("next/headers").then((m) => m.cookies());
  const sessionId = cookieStore.get("admin_session")?.value;

  if (!sessionId) {
    return NextResponse.json({ user: null });
  }

  const db = await getDb();
  const user = await db.queryOne<{ id: number; username: string }>(
    "SELECT id, username FROM admin_users WHERE id = $1",
    [Number(sessionId)]
  );

  return NextResponse.json({ user: user ?? null });
}
