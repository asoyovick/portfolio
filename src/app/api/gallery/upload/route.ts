import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2, R2_BUCKET, R2_PUBLIC_URL } from "@/lib/r2";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export async function POST(req: NextRequest) {
  await requireAdmin();

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  const ext = path.extname(file.name) || ".png";
  const key = `gallery/${uuidv4()}${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  await r2.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    })
  );

  const imageUrl = `${R2_PUBLIC_URL}/${key}`;

  return NextResponse.json({ path: imageUrl });
}
