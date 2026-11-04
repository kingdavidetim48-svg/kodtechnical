import { execFile } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = path.join(process.cwd(), "test-screenshots");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const viewports = [
  { name: "360px", width: 360, height: 800 },
  { name: "390px", width: 390, height: 844 },
  { name: "768px", width: 768, height: 1024 },
  { name: "1024px", width: 1024, height: 768 },
  { name: "1440px", width: 1440, height: 900 },
];

const routes = [
  { name: "homepage", path: "/" },
  { name: "about", path: "/about" },
  { name: "services", path: "/services" },
  { name: "service-detail-laser", path: "/services/precision-alignment" },
  { name: "service-detail-overhaul", path: "/services/equipment-overhaul" },
  { name: "service-detail-machining", path: "/services/ultra-modern-machine-shop" },
  { name: "projects", path: "/projects" },
  { name: "contact", path: "/contact" },
  { name: "privacy", path: "/privacy" },
  { name: "terms", path: "/terms" },
];

async function capture() {
  console.log("Beginning screenshot capture...");
  
  // First, capture the 5 required viewports for Homepage and Key pages
  for (const vp of viewports) {
    const outFile = path.join(outDir, `homepage-${vp.name}.png`);
    console.log(`Capturing Homepage at ${vp.name} (${vp.width}x${vp.height})...`);
    await execFileAsync(chromePath, [
      "--headless=new",
      "--disable-gpu",
      `--window-size=${vp.width},${vp.height}`,
      `--screenshot=${outFile}`,
      "http://localhost:3000/",
    ]);
  }

  // Also capture representative viewports for About, Projects, Services, Contact, etc.
  for (const route of routes) {
    if (route.name === "homepage") continue;
    const vp = { width: 1440, height: 900, name: "1440px" };
    const outFile = path.join(outDir, `${route.name}-${vp.name}.png`);
    console.log(`Capturing ${route.name} at ${vp.name}...`);
    await execFileAsync(chromePath, [
      "--headless=new",
      "--disable-gpu",
      `--window-size=${vp.width},${vp.height}`,
      `--screenshot=${outFile}`,
      `http://localhost:3000${route.path}`,
    ]);
    
    // Also mobile 390px capture for key pages
    if (["about", "projects", "contact", "services"].includes(route.name)) {
      const mobVp = { width: 390, height: 844, name: "390px" };
      const mobFile = path.join(outDir, `${route.name}-${mobVp.name}.png`);
      console.log(`Capturing ${route.name} at ${mobVp.name}...`);
      await execFileAsync(chromePath, [
        "--headless=new",
        "--disable-gpu",
        `--window-size=${mobVp.width},${mobVp.height}`,
        `--screenshot=${mobFile}`,
        `http://localhost:3000${route.path}`,
      ]);
    }
  }

  console.log("Screenshot capture complete! All files saved in:", outDir);
}

capture().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});

