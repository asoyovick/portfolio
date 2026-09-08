import { cookies } from "next/headers";
import { getDb } from "@/lib/db";

export async function getAdminSession(): Promise<{ id: number; username: string } | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("admin_session")?.value;
  if (!sessionId) return null;

  const db = getDb();
  const user = db
    .prepare("SELECT id, username FROM admin_users WHERE id = ?")
    .get(Number(sessionId)) as { id: number; username: string } | undefined;

  return user ?? null;
}

export async function requireAdmin(): Promise<{ id: number; username: string }> {
  const admin = await getAdminSession();
  if (!admin) {
    throw new Error("Unauthorized");
  }
  return admin;
}
