const sharp = require('sharp');
(async () => {
  try {
    // Render the brand SVG logo to a 512x512 PNG (transparent bg, the mark)
    await sharp('public/images/vendors/helix-core.svg')
      .resize(512, 512)
      .png()
      .toFile('public/images/vendors/helix-core.png');
    console.log('PNG written OK');
  } catch (e) {
    console.error('ERR', e.message);
    process.exit(1);
  }
})();
