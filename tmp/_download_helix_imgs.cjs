const https = require('https');
const fs = require('fs');
const path = require('path');

// compound slug on viralpeps  ->  helixcore product code in image URL
const MAP = {
  'bpc-157': 'bpc157',
  'tb-500': 'tb500',
  'bpc-157-tb-500': 'bpc157-tb500-blend',
  'cjc-1295-ipamorelin-blend': 'cjc1295-ipam-blend',
  'ipamorelin': 'ipam',
  'cjc-1295-no-dac': 'cjc1295nd',
  'cjc-1295-with-dac': 'cjc1295dac',
  'ghk-cu': 'ghkcu',
  'semax': 'semax',
  'selank': 'sel',
  'ghrp-6': 'ghrp6',
  'mots-c': 'motsc',
  'tesamorelin': 'tesamorelin',
  'aod-9604': 'aod9604',
  'epitalon': 'epitalon',
  'nad-plus': 'nadplus',
  'sermorelin': 'sermorelin',
  'kisspeptin-10': 'kisspeptin10',
  'pt-141': 'pt141',
  'melanotan-i': 'mt1',
  'thymosin-alpha-1': 'thymosinalpha1',
  'kpv': 'kpv',
  'dsip': 'dsip',
  'ss-31': 'ss31',
  'll-37': 'll37',
  'ara-290': 'ara290',
  'thymalin': 'thymalin',
  'glow': 'glowblend',
  'bacteriostatic-water': 'bacteriostatic-water',
  '5-amino-1mq': '5amino1mq',
};

const DIR = 'public/images/products/helix-core';
fs.mkdirSync(DIR, { recursive: true });

function download(url, dest) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return download(res.headers.location, dest).then(resolve);
      }
      if (res.statusCode !== 200) {
        res.resume();
        console.log('FAIL', res.statusCode, url);
        return resolve(false);
      }
      const f = fs.createWriteStream(dest);
      res.pipe(f);
      f.on('finish', () => { f.close(); console.log('OK', path.basename(dest)); resolve(true); });
      f.on('error', () => { fs.unlink(dest, () => {}); resolve(false); });
    }).on('error', (e) => { console.log('REQERR', url, e.message); resolve(false); });
  });
}

(async () => {
  let ok = 0, fail = 0;
  for (const [slug, code] of Object.entries(MAP)) {
    const url = `https://helixcore.co.uk/products/product-hxc-${code}-hero.webp`;
    const dest = path.join(DIR, `${slug}.webp`);
    const r = await download(url, dest);
    if (r) ok++; else fail++;
  }
  console.log(`DONE ok=${ok} fail=${fail}`);
})();
