// Capture screenshots of demo homepages using Playwright
const { chromium } = require('/home/z/.npm-global/lib/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const DEMOS = [
  {
    slug: 'parrilla-la-esquina',
    output: '/home/z/my-project/public/demo-restaurant.png',
    label: 'Parrilla La Esquina'
  },
  {
    slug: 'estudio-fernandez-romero',
    output: '/home/z/my-project/public/demo-abogados.png',
    label: 'Estudio Fernández & Romero'
  },
  {
    slug: 'cabanas-del-lago',
    output: '/home/z/my-project/public/demo-cabanas.png',
    label: 'Cabañas del Lago'
  }
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  for (const demo of DEMOS) {
    const url = `http://localhost:3000/demos/${demo.slug}`;
    console.log(`\n[${demo.label}] Capturing ${url}`);
    const page = await context.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      // Extra wait for fonts/animations
      await page.waitForTimeout(2500);
      // Try to scroll to top first
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      // Capture full viewport (not full page, since cards look better as viewport)
      await page.screenshot({
        path: demo.output,
        type: 'png',
        clip: { x: 0, y: 0, width: 1440, height: 900 }
      });
      const stats = fs.statSync(demo.output);
      console.log(`  ✓ Saved ${demo.output} (${(stats.size/1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`  ✗ Error capturing ${demo.slug}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('\nAll captures done.');
})().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
