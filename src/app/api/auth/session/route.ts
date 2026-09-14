import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
  return NextResponse.json({ user: { username: admin.username } });
}
