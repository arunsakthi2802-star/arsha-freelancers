const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const url = 'https://arshafreelancers.com';
const designDir = path.join(__dirname, 'design', 'before');

if (!fs.existsSync(designDir)) {
  fs.mkdirSync(designDir, { recursive: true });
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Desktop
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(designDir, 'home_desktop.png'), fullPage: true });

  // Mobile
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.screenshot({ path: path.join(designDir, 'home_mobile.png'), fullPage: true });

  await browser.close();
  console.log('Screenshots saved to /design/before/');
})();
