import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, "..", "images");
const outDir = path.join(__dirname, "..", "public", "images");
mkdirSync(outDir, { recursive: true });

// slug: descriptive name, maxWidth: target width for the largest usage of that photo
const files = [
  { src: "DSC08354.JPG", slug: "expo-floor-ev-booth-visitors", maxWidth: 2000 },
  { src: "DSC08357.JPG", slug: "expo-floor-components-booth", maxWidth: 1800 },
  { src: "DSC08365.JPG", slug: "expo-ev-powertrain-demo", maxWidth: 2000 },
  { src: "DSC08371.JPG", slug: "expo-ev-battery-showcase", maxWidth: 2400 },
  { src: "DSC08381.JPG", slug: "expo-motor-technology-booth", maxWidth: 2000 },
  { src: "DSC08503.JPG", slug: "expo-charging-station-crowd", maxWidth: 2000 },
  { src: "DSC08617.JPG", slug: "expo-battery-products-display", maxWidth: 1800 },
  { src: "DSC08620.JPG", slug: "expo-vip-lounge-branding", maxWidth: 2400 },
  { src: "DSC08626.JPG", slug: "expo-telematics-meeting", maxWidth: 1800 },
  { src: "DSC08646.JPG", slug: "expo-telematics-booth-discussion", maxWidth: 1800 },
];

for (const file of files) {
  const inPath = path.join(srcDir, file.src);
  const outPath = path.join(outDir, `${file.slug}.jpg`);
  const info = await sharp(inPath)
    .resize({ width: file.maxWidth, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(outPath);
  console.log(`${file.slug}.jpg -> ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)}KB`);
}
