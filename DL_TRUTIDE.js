#!/usr/bin/env node
/* Download Trutide product images + logo, convert to webp using sharp. */
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const { execSync } = require('child_process');

function download(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib.get(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'image/*,*/*' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('HTTP ' + res.statusCode + ' for ' + url));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

const OUT = path.join(__dirname, 'public/images');
const VENDOR = 'trutide';
const prodDir = path.join(OUT, 'products', VENDOR);
fs.mkdirSync(prodDir, { recursive: true });

// slug -> original full-size image URL from Trutide product pages
const products = {
  'bpc-157': 'https://trutide.co.uk/wp-content/uploads/2026/04/BPC10.png',
  'ghk-cu': 'https://trutide.co.uk/wp-content/uploads/2026/04/GHK100-1.png',
  'nad-plus': 'https://trutide.co.uk/wp-content/uploads/2026/04/NAD1000-2.png',
  'wolverine': 'https://trutide.co.uk/wp-content/uploads/2026/05/WOLVERINE20.jpg.webp',
  'klow': 'https://trutide.co.uk/wp-content/uploads/2026/04/KLOW80-1.png.webp',
  'cjc-1295-ipamorelin-blend': 'https://trutide.co.uk/wp-content/uploads/2026/04/CJCIPA10-1.png.webp',
};

const logoUrl = 'https://trutide.co.uk/wp-content/uploads/2026/04/android-chrome-512x512-1.png';

(async () => {
  // Logo
  try {
    const buf = await download(logoUrl);
    fs.writeFileSync(path.join(OUT, 'vendors', VENDOR + '.png'), buf);
    console.log('LOGO OK: vendors/' + VENDOR + '.png', buf.length, 'bytes');
  } catch (e) {
    console.log('LOGO FAIL:', e.message);
  }

  for (const [slug, url] of Object.entries(products)) {
    const outFile = path.join(prodDir, slug + '.webp');
    try {
      const buf = await download(url);
      const tmp = outFile + '.tmp';
      fs.writeFileSync(tmp, buf);
      // Convert whatever input to webp with sharp; transparent PNGs get flattened onto white
      const sharp = require('sharp');
      let img = sharp(tmp, { pages: -1 });
      const meta = await img.metadata();
      if (meta.format === 'png' && meta.hasAlpha) {
        img = sharp(tmp).flatten({ background: '#ffffff' });
      }
      await img.webp({ quality: 90 }).toFile(outFile);
      fs.unlinkSync(tmp);
      console.log('OK: ' + slug + ' -> ' + outFile);
    } catch (e) {
      console.log('FAIL: ' + slug + ' : ' + e.message);
    }
  }
  console.log('DONE');
})();
