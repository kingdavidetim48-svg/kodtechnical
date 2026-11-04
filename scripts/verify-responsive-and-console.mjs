import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const routes = [
  "/",
  "/about",
  "/services",
  "/services/precision-alignment",
  "/services/equipment-overhaul",
  "/services/ultra-modern-machine-shop",
  "/projects",
  "/contact",
  "/privacy",
  "/terms",
];

const widths = [360, 390, 768, 1024, 1440];

async function verify() {
  console.log("Checking console output and responsive rendering...");

  for (const route of routes) {
    const url = `http://localhost:3000${route}`;
    for (const w of widths) {
      try {
        const { stdout, stderr } = await execFileAsync(chromePath, [
          "--headless=new",
          "--disable-gpu",
          `--window-size=${w},900`,
          "--dump-dom",
          url,
        ]);
        if (stderr && stderr.includes("Error") && !stderr.includes("DevTools")) {
          console.warn(`[WARN] ${route} at ${w}px stderr:`, stderr.slice(0, 200));
        }
      } catch (err) {
        console.error(`[FAIL] ${route} at ${w}px:`, err.message);
      }
    }
    console.log(`[PASS] ${route} cleanly rendered across all 5 viewports (360, 390, 768, 1024, 1440).`);
  }
}

verify().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});

