// Optimize screenshots: resize to web-friendly dimensions and compress
const sharp = require('/home/z/.npm-global/lib/node_modules/sharp');
const path = require('path');

const FILES = [
  '/home/z/my-project/public/demo-restaurant.png',
  '/home/z/my-project/public/demo-abogados.png',
  '/home/z/my-project/public/demo-cabanas.png',
];

(async () => {
  for (const f of FILES) {
    const before = require('fs').statSync(f).size;
    const out = f.replace(/\.png$/, '-optimized.png');
    await sharp(f)
      .resize(1600, 1000, { fit: 'cover', position: 'top' })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(out);
    const after = require('fs').statSync(out).size;
    console.log(`${path.basename(f)}: ${(before/1024).toFixed(0)}KB -> ${(after/1024).toFixed(0)}KB`);
    // Replace original
    require('fs').renameSync(out, f);
  }
  console.log('Done.');
})().catch(e => { console.error(e); process.exit(1); });
