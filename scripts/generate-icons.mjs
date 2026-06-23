/**
 * PWA Icon Generator
 * Usage: node scripts/generate-icons.mjs
 *
 * Source: public/icon-source.png  (1024×1024, transparent background)
 * Output: public/icons/  (all required sizes)
 *
 * Requires: sharp (already in node_modules)
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "public", "icon-source.png");
const OUT = path.join(ROOT, "public", "icons");

if (!fs.existsSync(SRC)) {
  console.error("❌  public/icon-source.png not found.");
  console.error("    Save your 1024×1024 PNG there, then re-run this script.");
  process.exit(1);
}

fs.mkdirSync(OUT, { recursive: true });

const SIZES = [
  // Favicons
  { name: "favicon-16.png",  size: 16 },
  { name: "favicon-32.png",  size: 32 },
  { name: "favicon-48.png",  size: 48 },
  // Apple
  { name: "apple-touch-icon.png", size: 180 },
  { name: "apple-152.png",   size: 152 },
  { name: "apple-167.png",   size: 167 },
  { name: "apple-120.png",   size: 120 },
  // Android / PWA manifest
  { name: "icon-72.png",     size: 72 },
  { name: "icon-96.png",     size: 96 },
  { name: "icon-128.png",    size: 128 },
  { name: "icon-144.png",    size: 144 },
  { name: "icon-192.png",    size: 192 },
  { name: "icon-384.png",    size: 384 },
  { name: "icon-512.png",    size: 512 },
  // Windows MS Tile
  { name: "ms-tile-150.png", size: 150 },
];

// Maskable icons: add 15% padding (safe zone) with a dark background
const MASKABLE = [
  { name: "icon-192-maskable.png", size: 192 },
  { name: "icon-512-maskable.png", size: 512 },
];

async function generate() {
  console.log("🎨  Generating PWA icons from", SRC);

  for (const { name, size } of SIZES) {
    await sharp(SRC)
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(OUT, name));
    console.log(`  ✓  ${name}  (${size}×${size})`);
  }

  // Maskable: inner image fills ~70% with 15% padding all around
  for (const { name, size } of MASKABLE) {
    const inner = Math.round(size * 0.7);
    const pad   = Math.round((size - inner) / 2);
    const resized = await sharp(SRC)
      .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    await sharp({
      create: { width: size, height: size, channels: 4, background: { r: 11, g: 12, b: 16, alpha: 255 } },
    })
      .composite([{ input: resized, top: pad, left: pad }])
      .png()
      .toFile(path.join(OUT, name));
    console.log(`  ✓  ${name}  (${size}×${size}, maskable)`);
  }

  // Generate favicon.ico (multi-size: 16 + 32 + 48)
  // Sharp doesn't write .ico natively; we output the 32px PNG as fallback favicon.
  // Modern browsers prefer the PNG link rel="icon" anyway.
  console.log("\n✅  Done! All icons written to public/icons/");
  console.log("    Copy public/icons/favicon-32.png → public/favicon.ico if needed.");
}

generate().catch((err) => {
  console.error("❌  Error:", err.message);
  process.exit(1);
});
