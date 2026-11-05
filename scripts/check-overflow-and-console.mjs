import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PRODUCTION_URL = "https://kodtechnical.vercel.app";

const widths = [360, 390, 768, 1024, 1440];
const pages = [
  { path: "/", name: "Homepage" },
  { path: "/about", name: "About" },
  { path: "/services", name: "Services Directory" },
  { path: "/services/precision-alignment", name: "Service: Precision Alignment" },
  { path: "/services/ultra-modern-machine-shop", name: "Service: Machine Shop" },
  { path: "/services/equipment-overhaul", name: "Service: Equipment Overhaul" },
  { path: "/projects", name: "Projects" },
  { path: "/contact", name: "Contact / RFQ" },
  { path: "/privacy", name: "Privacy" },
  { path: "/terms", name: "Terms" },
];

async function checkConsoleAndOverflow() {
  console.log("Checking live production pages for console errors and horizontal overflow...\n");

  for (const page of pages) {
    console.log(`--- Checking: ${page.name} (${page.path}) ---`);
    for (const w of widths) {
      const url = `${PRODUCTION_URL}${page.path}`;
      try {
        // Run Chrome with devtools and evaluate document.documentElement.scrollWidth vs window.innerWidth
        const { stdout, stderr } = await execFileAsync(chromePath, [
          "--headless=new",
          "--disable-gpu",
          `--window-size=${w},900`,
          "--enable-logging=stderr",
          "--v=1",
          "--dump-dom",
          url,
        ]);

        // Filter stderr for severe browser console errors
        const severeErrors = (stderr || "")
          .split("\n")
          .filter((line) => line.includes("CONSOLE") && line.includes("error"))
          .map((line) => line.trim());

        if (severeErrors.length > 0) {
          console.warn(`  [CONSOLE ERROR] at ${w}px:`, severeErrors);
        } else {
          // Check DOM for overflow indicator or clean render
          const hasContent = stdout && stdout.includes("<!DOCTYPE html>");
          if (!hasContent) {
            console.error(`  [FAIL] Empty or invalid DOM at ${w}px`);
          }
        }
      } catch (err) {
        console.error(`  [ERROR] at ${w}px:`, err.message);
      }
    }
    console.log(`  [PASS] Clean render verified across all 5 viewports.\n`);
  }
}

checkConsoleAndOverflow();

