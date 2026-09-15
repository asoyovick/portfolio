import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  console.log(`[login] Attempt: username=${username}`);

  const db = await getDb();
  const user = await db.queryOne<{
    id: number;
    username: string;
    password_hash: string;
  }>("SELECT * FROM admin_users WHERE username = $1", [username]);

  if (!user) {
    console.log(`[login] User not found: ${username}`);
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  console.log(`[login] User found: id=${user.id}, password_hash=${user.password_hash}`);

  const valid = bcrypt.compareSync(password, user.password_hash);
  console.log(`[login] bcrypt compare result: ${valid}`);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_session", String(user.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
