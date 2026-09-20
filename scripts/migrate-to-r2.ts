/**
 * One-time migration: uploads every file in public/uploads/ to Cloudflare R2
 * and updates the gallery_photos.image_path column in the database.
 *
 * Usage:
 *   npx tsx scripts/migrate-to-r2.ts
 *
 * Required env vars (same as the app):
 *   DATABASE_URL
 *   CLOUDFLARE_ACCOUNT_ID
 *   CLOUDFLARE_R2_ACCESS_KEY_ID
 *   CLOUDFLARE_R2_SECRET_ACCESS_KEY
 *   R2_BUCKET_NAME
 *   R2_PUBLIC_URL          – e.g. https://pub-xxxx.r2.dev
 */

import fs from "fs";
import path from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import pg from "pg";

// ── Config ──────────────────────────────────────────────────────────────────

const {
  DATABASE_URL,
  CLOUDFLARE_ACCOUNT_ID,
  CLOUDFLARE_R2_ACCESS_KEY_ID,
  CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  R2_BUCKET_NAME,
  R2_PUBLIC_URL,
} = process.env;

if (
  !DATABASE_URL ||
  !CLOUDFLARE_ACCOUNT_ID ||
  !CLOUDFLARE_R2_ACCESS_KEY_ID ||
  !CLOUDFLARE_R2_SECRET_ACCESS_KEY ||
  !R2_BUCKET_NAME ||
  !R2_PUBLIC_URL
) {
  console.error(
    "Missing one or more required env vars. " +
      "Ensure DATABASE_URL, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_R2_ACCESS_KEY_ID, " +
      "CLOUDFLARE_R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, and R2_PUBLIC_URL are set."
  );
  process.exit(1);
}

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

const pool = new pg.Pool({ connectionString: DATABASE_URL });
const uploadsDir = path.resolve(process.cwd(), "public", "uploads");

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(uploadsDir)) {
    console.log("No public/uploads/ directory found — nothing to migrate.");
    return;
  }

  const files = fs
    .readdirSync(uploadsDir)
    .filter((f) => !f.startsWith(".")); // skip .DS_Store etc.

  if (files.length === 0) {
    console.log("public/uploads/ is empty — nothing to migrate.");
    return;
  }

  console.log(`Found ${files.length} file(s) in public/uploads/`);

  for (const filename of files) {
    const localPath = path.join(uploadsDir, filename);
    const stat = fs.statSync(localPath);
    if (!stat.isFile()) continue;

    const ext = path.extname(filename);
    const key = `gallery/${filename}`;
    const imageUrl = `${R2_PUBLIC_URL}/${key}`;

    console.log(`\n  Uploading ${filename} → ${key}`);

    const body = fs.readFileSync(localPath);
    await s3.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
        Body: body,
        ContentType: mimeFromExt(ext),
      })
    );

    // Update every row whose image_path references this local file.
    // Old format: "uploads/<filename>"
    const oldPath = `uploads/${filename}`;
    const result = await pool.query(
      "UPDATE gallery_photos SET image_path = $1 WHERE image_path = $2",
      [imageUrl, oldPath]
    );

    const updated = (result as pg.QueryResult).rowCount ?? 0;
    if (updated > 0) {
      console.log(`    ✓ Updated ${updated} DB row(s) → ${imageUrl}`);
    } else {
      console.log(
        `    ⚠ No DB row with image_path = "${oldPath}" — file uploaded but DB not updated.`
      );
    }
  }

  await pool.end();
  console.log("\nMigration complete.");
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function mimeFromExt(ext: string): string {
  const map: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".bmp": "image/bmp",
    ".ico": "image/x-icon",
  };
  return map[ext.toLowerCase()] ?? "application/octet-stream";
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
