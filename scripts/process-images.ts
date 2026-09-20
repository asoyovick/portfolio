/**
 * Image pipeline for the public portfolio site.
 *
 * Reads source photos from public/ (originals, untouched) and writes
 * optimized, color-graded derivatives into public/images/.
 *
 * Run: npm run images
 *
 * Replace any file in public/images/ with your own photo (same name)
 * to swap imagery without touching code. See public/images/README.md.
 */
import sharp, { type Sharp } from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(process.cwd());
const OUT = path.join(ROOT, "public", "images");
/** Editorial grade: gentle contrast lift, slight desaturation, no fake color casts. */
const grade = (s: Sharp) =>
  s.modulate({ saturation: 0.88, brightness: 1.02 }).linear(1.04, -6);

async function fromJpg(
  src: string,
  out: string,
  width: number,
  height: number,
  opts: { position?: string; quality?: number } = {},
) {
  await grade(sharp(src))
    .resize(width, height, { fit: "cover", position: opts.position ?? "attention" })
    .jpeg({ quality: opts.quality ?? 80, progressive: true, mozjpeg: true })
    .toFile(path.join(OUT, out));
  console.log(`✓ ${out}`);
}

async function main() {
  await mkdir(OUT, { recursive: true });

  // Hero — cinematic wide crop, dominates the right side of the viewport.
  await fromJpg("public/IMG_3834.JPG", "hero.jpg", 2400, 1800, { quality: 82 });
  // Smaller hero for narrow screens keeps mobile payloads light.
  await fromJpg("public/IMG_3834.JPG", "hero-mobile.jpg", 1200, 1350, { quality: 78 });

  // About — portrait crop of the profile photo.
  await fromJpg("public/profile.jpg", "about.jpg", 1000, 1250, { quality: 82 });

  // Drives — atmospheric landscape-grade frame from the second photo.
  await fromJpg("public/IMG_3835.JPG", "drives.jpg", 2400, 1400, { quality: 80 });

  // OG image — 1200x630, near-black canvas with the monogram.
  const ogSvg = Buffer.from(
    `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#0b0b0d"/>
      <text x="96" y="340" font-family="Arial, Helvetica, sans-serif" font-size="120" font-weight="700" fill="#f5f2ec" letter-spacing="-4">VICTOR OUMA</text>
      <text x="100" y="410" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#4f74f9" letter-spacing="6">SOFTWARE · AI · BACKEND · CYBERSECURITY</text>
      <rect x="100" y="470" width="64" height="4" fill="#4f74f9"/>
    </svg>`,
  );
  await sharp(ogSvg).png({ compressionLevel: 9 }).toFile(path.join(OUT, "og.png"));
  console.log("✓ og.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
