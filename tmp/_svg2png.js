const fs=require('fs');
let sharp;
try { sharp=require('sharp'); } catch(e){ console.log('NO_SHARP:', e.message); process.exit(0); }
sharp('public/images/vendors/kingston-peptides.svg')
  .resize(400)
  .png()
  .toFile('public/images/vendors/kingston-peptides.png')
  .then(i=>console.log('OK png', i.width+'x'+i.height, i.size+' bytes'))
  .catch(e=>console.log('ERR', e.message));
