#!/usr/bin/env node
/**
 * Convert iPhone HEIC photos to JPEG for use on the website.
 * Usage: npm run convert-heic
 *
 * 1. Create a folder: daniel-german/heic-input/
 * 2. Drop your iPhone .heic / .HEIC files into it
 * 3. Run: npm run convert-heic
 * 4. Converted .jpg files appear in daniel-german/public/images/
 * 5. Rename them to match the naming convention before deploying
 */

import { readdir, readFile, writeFile, mkdir } from "fs/promises";
import { join, basename, extname } from "path";
import { existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = join(__dirname, "../heic-input");
const OUTPUT_DIR = join(__dirname, "../public/images");

// Ensure output directory exists
await mkdir(OUTPUT_DIR, { recursive: true });

if (!existsSync(INPUT_DIR)) {
  console.log(`Creating input directory: ${INPUT_DIR}`);
  await mkdir(INPUT_DIR, { recursive: true });
  console.log("Drop your .heic files into the heic-input/ folder, then run this script again.");
  process.exit(0);
}

const { default: convert } = await import("heic-convert");

const files = await readdir(INPUT_DIR);
const heicFiles = files.filter((f) =>
  [".heic", ".heif", ".HEIC", ".HEIF"].includes(extname(f))
);

if (heicFiles.length === 0) {
  console.log("No HEIC files found in heic-input/. Add some and try again.");
  process.exit(0);
}

console.log(`Converting ${heicFiles.length} HEIC file(s)...`);

for (const file of heicFiles) {
  const inputBuffer = await readFile(join(INPUT_DIR, file));
  const outputBuffer = await convert({
    buffer: inputBuffer,
    format: "JPEG",
    quality: 0.9,
  });
  const outName = basename(file, extname(file)) + ".jpg";
  await writeFile(join(OUTPUT_DIR, outName), Buffer.from(outputBuffer));
  console.log(`  ✓ ${file} → ${outName}`);
}

console.log(`\nDone! Converted files are in daniel-german/public/images/`);
console.log("Remember to rename them to match the site naming convention.");
