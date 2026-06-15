import sharp from "sharp";
import fs from "fs";
import path from "path";

const IMG_DIR = path.join(process.cwd(), "public/images/photos");
const MAX_PX = 2400;
const QUALITY = 82;

const exts = new Set([".jpg", ".jpeg", ".png"]);

async function main() {
  const files = fs.readdirSync(IMG_DIR).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return exts.has(ext);
  });

  console.log(`Found ${files.length} images to process\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const inputPath = path.join(IMG_DIR, file);
    const outputPath = path.join(IMG_DIR, path.basename(file, path.extname(file)) + ".webp");
    const stat = fs.statSync(inputPath);
    totalBefore += stat.size;

    try {
      await sharp(inputPath)
        .resize(MAX_PX, MAX_PX, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 4 })
        .toFile(outputPath);

      const outStat = fs.statSync(outputPath);
      totalAfter += outStat.size;

      const ratio = ((outStat.size / stat.size) * 100).toFixed(1);
      console.log(`  ${file} → ${path.basename(outputPath)}  (${(stat.size / 1024 / 1024).toFixed(1)}MB → ${(outStat.size / 1024).toFixed(0)}KB, ${ratio}%)`);
    } catch (err) {
      console.error(`  FAILED: ${file} — ${err.message}`);
    }
  }

  console.log(`\nDone. ${(totalBefore / 1024 / 1024).toFixed(0)}MB → ${(totalAfter / 1024 / 1024).toFixed(0)}MB (${((totalAfter / totalBefore) * 100).toFixed(1)}%)`);
}

main().catch(console.error);
