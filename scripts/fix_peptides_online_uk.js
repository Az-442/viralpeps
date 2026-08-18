#!/usr/bin/env node
/* Fix format mismatches for Peptides Online UK images:
   1. acetic-acid-10ml.webp is actually PNG -> convert to real WebP (resize max 800)
   2. peptides-online-uk.png logo is actually WebP -> convert to real PNG (resize max 200)
   Also normalize all product images so longest side <= 800 for consistency. */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
(async () => {
  // 1. Acetic acid -> real webp
  const acc = path.join(ROOT, 'public/images/products/peptides-online-uk/acetic-acid-10ml.webp');
  const ameta = await sharp(acc).metadata();
  console.log('acetic-acid before:', ameta.format, ameta.width + 'x' + ameta.height);
  await sharp(acc)
    .resize({ width: 600, withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile(acc + '.t');
  fs.renameSync(acc + '.t', acc);
  const ameta2 = await sharp(acc).metadata();
  console.log('acetic-acid after:', ameta2.format, ameta2.width + 'x' + ameta2.height);

  // 2. Logo webp -> real png
  const logo = path.join(ROOT, 'public/images/vendors/peptides-online-uk.png');
  const lmeta = await sharp(logo).metadata();
  console.log('logo before:', lmeta.format, lmeta.width + 'x' + lmeta.height);
  await sharp(logo)
    .resize({ width: 200, withoutEnlargement: true })
    .png({ quality: 90 })
    .toFile(logo + '.t');
  fs.renameSync(logo + '.t', logo);
  const lmeta2 = await sharp(logo).metadata();
  console.log('logo after:', lmeta2.format, lmeta2.width + 'x' + lmeta2.height);

  // 3. Normalize all product images (most are ~300x772, already small). Scale longest <= 800.
  const dir = path.join(ROOT, 'public/images/products/peptides-online-uk');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.webp'));
  for (const f of files) {
    const full = path.join(dir, f);
    if (f === 'acetic-acid-10ml.webp') continue; // already done
    try {
      const meta = await sharp(full).metadata();
      const longSide = Math.max(meta.width, meta.height);
      if (longSide > 800) {
        const scale = 800 / longSide;
        const targetW = Math.round(meta.width * scale);
        const targetH = Math.round(meta.height * scale);
        await sharp(full).resize(targetW, targetH).webp({ quality: 90 }).toFile(full + '.t');
        fs.renameSync(full + '.t', full);
        const m2 = await sharp(full).metadata();
        console.log('resized', f, '->', m2.format, m2.width + 'x' + m2.height);
      }
    } catch (e) {
      console.log('FAIL', f, e.message);
    }
  }
  console.log('DONE');
})();
