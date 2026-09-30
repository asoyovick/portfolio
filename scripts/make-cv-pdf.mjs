/**
 * One-time generator for a placeholder CV PDF at public/cv/Victor-Ouma-CV.pdf.
 * Replace this file with your real CV — the Download CV button on /cv links here.
 * Run: node scripts/make-cv-pdf.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const OUT = join(process.cwd(), "public", "cv", "Victor-Ouma-CV.pdf");

const esc = (s) => s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

const lines = [
  { text: "Victor Ouma", font: "F1", size: 24, gap: 0 },
  { text: "Software · AI · Backend Developer — Kisumu, Kenya", font: "F2", size: 12, gap: 8 },
  { text: "", font: "F2", size: 12, gap: 8 },
  { text: "PROFILE", font: "F1", size: 11, gap: 0 },
  { text: "Developer and builder focused on backend systems, practical AI and", font: "F2", size: 11, gap: 4 },
  { text: "security-minded engineering. Learning by shipping: Go services, APIs", font: "F2", size: 11, gap: 4 },
  { text: "and products like VECAI and Chemichemi.", font: "F2", size: 11, gap: 4 },
  { text: "", font: "F2", size: 11, gap: 10 },
  { text: "EXPERIENCE", font: "F1", size: 11, gap: 0 },
  { text: "2025 - Present   Independent Developer & Builder - VECAI / Chemichemi", font: "F2", size: 11, gap: 4 },
  { text: "2023 - 2025      Peer-driven Software Training - Zone01 Kisumu", font: "F2", size: 11, gap: 4 },
  { text: "2022 - 2023      Freelance & Community Projects - Kenya", font: "F2", size: 11, gap: 4 },
  { text: "", font: "F2", size: 11, gap: 10 },
  { text: "SKILLS", font: "F1", size: 11, gap: 0 },
  { text: "Go · TypeScript · SQL · REST APIs · SQLite/Postgres · WebSockets", font: "F2", size: 11, gap: 4 },
  { text: "Applied AI · Secure coding · Threat modelling · Git · Linux · Next.js", font: "F2", size: 11, gap: 4 },
  { text: "", font: "F2", size: 11, gap: 10 },
  { text: "CONTACT", font: "F1", size: 11, gap: 0 },
  { text: "oumaasoyoh@gmail.com  ·  github.com/asoyovick  ·  linkedin.com/in/victorouma", font: "F2", size: 11, gap: 4 },
];

// Build the content stream: each line is one Tj with a leading jump.
let y = 760;
let content = "";
for (const line of lines) {
  if (line.text) {
    content += `BT /${line.font} ${line.size} Tf 72 ${y} Td (${esc(line.text)}) Tj ET\n`;
  }
  y -= line.gap || 14;
}

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>",
  `<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}endstream`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
];

let pdf = "%PDF-1.4\n";
const offsets = [0];
for (let i = 0; i < objects.length; i++) {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
}
const xrefStart = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (let i = 1; i <= objects.length; i++) {
  pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, pdf, "latin1");
console.log(`✓ ${OUT}`);
