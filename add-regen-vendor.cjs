const fs = require('fs');

const compounds = JSON.parse(fs.readFileSync('src/data/compounds.json', 'utf-8'));
const vendorName = 'Regen Peptides';
const baseUrl = 'https://www.regenpeptides.co.uk';

// Map of Regen product -> compound id mapping
const regenProducts = {
  'bpc-157': { title: 'BPC 157', url: '/products/bpc-157', price: '£15.00', dosage: '10mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/BPC157-10mg.jpg?v=1774608902&width=3840' },
  'ghrp-2': { title: 'GHRP-2', url: '/products/ghrp-2', price: '£18.00', dosage: '10mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/GHRP-2_9e0ba634-9870-4893-b198-4b5397881d52.jpg?v=1774608768&width=3840' },
  'aod9604': { title: 'AOD-9604', url: '/products/aod-9604', price: '£25.00', dosage: '5mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/atomicjake-12_vial_product_R01_AOD_9604_5MG_db70f949-ffea-4abe-a016-90a71557cf4c.jpg?v=1774608789&width=3840' },
  'mots-c': { title: 'MOTS-C', url: '/products/mots-c', price: '£25.00', dosage: '10mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/atomicjake-12_vial_product_R01_MOTS-C_20MG_20db498d-3ce4-42ce-bee5-8d059845daf3.jpg?v=1774608792&width=3840' },
  'ss-31': { title: 'SS-31', url: '/products/ss-31', price: '£40.00', dosage: '10mg', image: '' },
  'ghk-cu': { title: 'GHK-CU', url: '/products/ghk-cu', price: '£25.00', dosage: '50mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/Whisk_bb6fbad8c0fa10895434d55ff708b756dr.png?v=1775080651&width=3840' },
  'kpv': { title: 'KPV', url: '/products/kpv', price: '£25.00', dosage: '10mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/atomicjake-13_vial_product_R03_KPV_54eaea48-eb28-4ea0-9d35-0e7158e5b14d.jpg?v=1774608797&width=3840' },
  'epitalon': { title: 'Epithalon', url: '/products/epithalon', price: '£15.00', dosage: '10mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/atomicjake-9-_3_-R01-Epithalon-10mg_fdee4e00-db4f-4ad5-96ad-5ecc78d9f111.jpg?v=1774608848&width=3840' },
  'semax': { title: 'Semax', url: '/products/semax', price: '£25.00', dosage: '10mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/atomicjake-13_vial_product_SEMAX_R02_9ef766fe-8931-4c43-afcb-86c15c847fc9.jpg?v=1774608800&width=3840' },
  'selank': { title: 'Selank', url: '/products/selank', price: '£30.00', dosage: '10mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/atomicjake-9-_3_-R01-Selank-10mg_a9f8b576-9928-4232-817f-b27060d4e08f.jpg?v=1774608877&width=3840' },
  'ara-290': { title: 'ARA-290', url: '/products/ara-290', price: '£35.00', dosage: '5mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/ARA---290_20b7cde0-eddf-4535-85a9-798f0475493f.jpg?v=1774608755&width=3840' },
  'dsip': { title: 'DSIP', url: '/products/dsip', price: '£15.00', dosage: '10mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/DSIP_41a8a3b9-98a8-4b7e-a9e5-cce3a1299528.jpg?v=1774608763&width=3840' },
  'ipamorelin': { title: 'Ipamorelin', url: '/products/ipamorelin', price: '£45.00', dosage: '10mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/atomicjake-9-_3_-R01-Ipamorelin-10mg_2da1272d-e4a5-4e2f-8421-7986653ead1c.jpg?v=1774608863&width=3840' },
  'hexarelin': { title: 'Hexarelin', url: '/products/hexarelin', price: '£40.00', dosage: '2mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/HEXARELIN_2c7ed8a0-daba-453a-b93f-5435cff82429.jpg?v=1774608773&width=3840' },
  'pt-141': { title: 'PT-141', url: '/products/pt-141', price: '£20.00', dosage: '10mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/PT-141-Regenpeptides.jpg?v=1779211097&width=3840' },
  'kisspeptin-10': { title: 'Kisspeptin', url: '/products/kisspeptin', price: '£30.00', dosage: '10mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/KISSPEPTIN_57e3754c-2e63-4302-948c-73d1350f8e69.jpg?v=1774608778&width=3840' },
  'fragment-176-191': { title: 'HGH Fragment 176-191', url: '/products/hgh-fragment-176-191', price: '£20.00', dosage: '5mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/HGH-FRAGMENT-176-191_ab963c7d-0326-4bb5-b1ac-8516f0b560f4.jpg?v=1774608776&width=3840' },
  'cjc-1295': { title: 'CJC1295 With DAC', url: '/products/cjc1295-with-dac', price: '£35.00', dosage: '10mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/CJC1295-With-DAC_30ba21ce-f951-4333-b33f-66c96041e040.jpg?v=1774608757&width=3840' },
  'igf-1-lr3': { title: 'IGF-1 LR3', url: '/products/igf-1-lr3', price: '£40.00', dosage: '1mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/atomicjake-9-_3_-R01-IGF-1LR3-1mg_611fcda9-3899-4ba2-bd1a-6cb25d9f7728.jpg?v=1774608860&width=3840' },
  'ghrp-6': { title: 'GHRP-6', url: '/products/ghrp-6', price: '£18.00', dosage: '10mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/GHRP-6_3c3e61ad-6e50-4740-a0a4-4d6755610bb0.jpg?v=1774608771&width=3840' },
  'nad-plus': { title: 'NAD+', url: '/products/nad', price: '£55.00', dosage: '1000mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/atomicjake-9__3__R02_NAD__1000mg.jpg?v=1775245712&width=3840' },
  'tesamorelin': { title: 'Tesamorelin', url: '/products/tesamorelin', price: '£50.00', dosage: '10mg', image: '' },
  'bacteriostatic-water': { title: 'Bacteriostatic Water', url: '/products/bacteriostatic-water', price: '£2.50', dosage: '30ml', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/atomicjake-13_vial_product_-_R03_BACTERIOSTATIC_WATER_2630643f-262e-4e09-9e8e-755bf15f9402.jpg?v=1774608795&width=3840' },
  'wolverine-stack-bpc157-tb500-blend': { title: 'BPC 157 / TB500', url: '/products/bpc-157-tb500', price: '£40.00', dosage: '10mg+10mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/atomicjake-9-_3_-R01-BPC157-TB500-10mg-10mg_474a01b6-0dab-40de-a4ac-4497b267468b.jpg?v=1774608839&width=3840' },
  'cjc-1295-ipamorelin-blend': { title: 'CJC-1295 Without DAC / Ipamorelin', url: '/products/cjc-1295-without-dac-ipamorelin', price: '£40.00', dosage: '5mg+5mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/atomicjake-9-_3_-R01-CJC-1295-Ipamorelin-5mg-5mg_67b8f986-ced1-4617-8ad3-084d192f6677.jpg?v=1775246004&width=3840' },
  'glow': { title: 'GLOW50 / GLOW70', url: '/products/glow', price: '£50.00', dosage: '50mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/atomicjake-9-_3_-R01-GLOW50.jpg?v=1775245734&width=3840' },
  'klow': { title: 'KLOW80', url: '/products/klow80', price: '£75.00', dosage: '80mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/Whisk_08c6e5c63b854ff8a7a449540c1aedb6dr.png?v=1775080864&width=3840' },
  '5-amino-1mq': { title: '5-Amino-1MQ', url: '/products/5-amino-1mq', price: '£30.00', dosage: '50mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/atomicjake-9-_3_-R01-5-Amino-1MQ-50mg.jpg?v=1775245691&width=3840' },
};

// Add CJC1295 Without DAC as a separate entry
regenProducts['cjc-1295-wo-dac'] = { title: 'CJC1295 Without DAC', url: '/products/cjc1295-without-dac', price: '£25.00', dosage: '10mg', image: 'https://www.regenpeptides.co.uk/cdn/shop/files/CJC1295-Without-DAC_99a3a566-8835-4bb0-885e-92fb80ffb4bd.jpg?v=1774608760&width=3840' };

let count = 0;
for (const c of compounds) {
  const product = regenProducts[c.id];
  if (product) {
    // Check if Regen is already a source
    const alreadyExists = c.sources.some(s => s.vendor === vendorName);
    if (!alreadyExists) {
      c.sources.push({
        vendor: vendorName,
        url: `${baseUrl}${product.url}`,
        price: product.price,
        inStock: true,
        dosage: product.dosage,
        image: product.image || ''
      });
      count++;
      console.log(`Added Regen Peptides to ${c.id} (${product.title})`);
    }
  }
}

// Handle cjc-1295 - we added CJC1295 With DAC above
// Need to also add CJC1295 Without DAC as a separate source entry for the same compound
const cjcCompound = compounds.find(c => c.id === 'cjc-1295');
if (cjcCompound) {
  const woDacProduct = regenProducts['cjc-1295-wo-dac'];
  // Add a separate source entry for the without-DAC variant
  const woDacExists = cjcCompound.sources.some(s => s.vendor === vendorName && s.dosage === '10mg' && s.url?.includes('without-dac'));
  if (!woDacExists && woDacProduct) {
    cjcCompound.sources.push({
      vendor: vendorName,
      url: `${baseUrl}${woDacProduct.url}`,
      price: woDacProduct.price,
      inStock: true,
      dosage: woDacProduct.dosage,
      image: woDacProduct.image || ''
    });
    count++;
    console.log(`Added Regen Peptides to ${cjcCompound.id} (${woDacProduct.title})`);
  }
}

console.log(`\nTotal sources added: ${count}`);

fs.writeFileSync('src/data/compounds.json', JSON.stringify(compounds, null, 2), 'utf-8');
console.log('Done! Saved to compounds.json');
