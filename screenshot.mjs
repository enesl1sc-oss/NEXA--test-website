import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Try to find puppeteer
let puppeteer;
const puppeteerPaths = [
  'puppeteer',
  'C:/Users/Ene/OneDrive/Desktop/n8n copy/nodes/node_modules/n8n-nodes-puppeteer/node_modules/puppeteer',
  'C:/Users/Ene/Desktop/n8n copy/nodes/node_modules/n8n-nodes-puppeteer/node_modules/puppeteer',
];

for (const p of puppeteerPaths) {
  try {
    puppeteer = require(p);
    if (puppeteer.default) puppeteer = puppeteer.default;
    break;
  } catch {}
}

if (!puppeteer) {
  console.error('Puppeteer not found. Tried:', puppeteerPaths);
  process.exit(1);
}

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

// Ensure output directory exists
const outDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Find next available screenshot number
let n = 1;
while (fs.existsSync(path.join(outDir, `screenshot-${n}${label ? '-' + label : ''}.png`))) n++;
const filename = `screenshot-${n}${label ? '-' + label : ''}.png`;
const outPath = path.join(outDir, filename);

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

  // Scroll through the full page to trigger IntersectionObserver, then wait for fallback
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 400) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await new Promise(r => setTimeout(r, 120));
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 2200)); // wait for 2s fallback to fire

  await page.screenshot({ path: outPath, fullPage: true });
  await browser.close();
  console.log(`Screenshot saved: ${outPath}`);
})();
