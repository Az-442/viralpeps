#!/usr/bin/env node
/* Resize Trutide product images: scale so max dimension = 800 regardless. */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'public/images/products/trutide');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.webp'));

(async () => {
  for (const f of files) {
    const full = path.join(dir, f);
    try {
      const meta = await sharp(full).metadata();
      const longSide = Math.max(meta.width, meta.height);
      let targetW = meta.width;
      let targetH = meta.height;
      if (longSide > 800) {
        const scale = 800 / longSide;
        targetW = Math.round(meta.width * scale);
        targetH = Math.round(meta.height * scale);
      }
      await sharp(full)
        .resize(targetW, targetH)
        .webp({ quality: 90 })
        .toFile(full + '.t');
      fs.renameSync(full + '.t', full);
      const m2 = await sharp(full).metadata();
      console.log('resized', f, '->', m2.width + 'x' + m2.height);
    } catch (e) {
      console.log('FAIL', f, e.message);
    }
  }
  console.log('DONE');
})();
