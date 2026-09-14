import { cookies } from "next/headers";
import { getDb } from "@/lib/db";

export async function getAdminSession(): Promise<{ id: number; username: string } | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("admin_session")?.value;
  if (!sessionId) return null;

  const db = await getDb();
  const user = await db.queryOne<{ id: number; username: string }>(
    "SELECT id, username FROM admin_users WHERE id = $1",
    [Number(sessionId)]
  );

  return user ?? null;
}

export async function requireAdmin(): Promise<{ id: number; username: string }> {
  const admin = await getAdminSession();
  if (!admin) {
    throw new Error("Unauthorized");
  }
  return admin;
}
