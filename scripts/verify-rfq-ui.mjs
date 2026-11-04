/**
 * Headless Chrome Capture for Contact RFQ Page across 5 viewports
 */

import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execFileAsync = promisify(execFile);
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const viewports = [
  { width: 360, height: 800, name: "360px" },
  { width: 390, height: 844, name: "390px" },
  { width: 768, height: 1024, name: "768px" },
  { width: 1024, height: 768, name: "1024px" },
  { width: 1440, height: 900, name: "1440px" },
];

async function captureContactViewports() {
  console.log("Capturing Contact RFQ Page screenshots across 5 viewports...");
  const screenshotDir = path.resolve(process.cwd(), "test-screenshots");
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  for (const vp of viewports) {
    const filePath = path.join(screenshotDir, `contact-rfq-${vp.name}.png`);
    const args = [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      `--window-size=${vp.width},${vp.height}`,
      `--screenshot=${filePath}`,
      "http://127.0.0.1:3000/contact",
    ];

    try {
      await execFileAsync(CHROME_PATH, args, { timeout: 20000 });
      const stats = fs.statSync(filePath);
      console.log(`[PASS] Captured contact-rfq-${vp.name}.png (${stats.size} bytes)`);
    } catch (err) {
      console.error(`[FAIL] Error capturing contact-rfq-${vp.name}.png:`, err.message);
    }
  }
}

captureContactViewports().catch(console.error);
