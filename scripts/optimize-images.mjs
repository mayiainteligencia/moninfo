// Genera variantes AVIF/WebP de public/assets/images/*.{jpg,png} en public/assets/images/_opt.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const dir = 'public/assets/images';
const out = path.join(dir, '_opt');
fs.mkdirSync(out, { recursive: true });
const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f));
for (const f of files) {
  const name = path.parse(f).name;
  for (const w of [640, 1280, 1920]) {
    const img = sharp(path.join(dir, f)).resize({ width: w, withoutEnlargement: true });
    await img.clone().avif({ quality: 55 }).toFile(path.join(out, `${name}-${w}.avif`));
    await img.clone().webp({ quality: 72 }).toFile(path.join(out, `${name}-${w}.webp`));
  }
}
console.log(`optimize-images: ${files.length} imagen(es)`);
