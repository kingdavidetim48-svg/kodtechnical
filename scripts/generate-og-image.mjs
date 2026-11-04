import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const WORKSPACE = "c:/Users/LOYAL/Desktop/WEB/warriman";
const OUTPUT_PATH = path.join(WORKSPACE, "public/images/brand/og-image.jpg");
const LOGO_PATH = path.join(WORKSPACE, "public/images/brand/kod-logo.png");
const BACKGROUND_PHOTO = path.join(WORKSPACE, "public/images/engineering/field-compressor-skid-siemens.jpg");

async function generateOgImage() {
  console.log("Generating 1200x630 Open Graph image for KOD Technical Services...");

  const width = 1200;
  const height = 630;

  // 1. Process background engineering photo: crop/resize to 1200x630 with dark industrial tint
  const bgImageBuffer = await sharp(BACKGROUND_PHOTO)
    .resize(width, height, { fit: "cover", position: "center" })
    .modulate({ brightness: 0.25, saturation: 0.6 })
    .blur(1.5)
    .toBuffer();

  // 2. Read logo and resize
  let logoBuffer = null;
  if (fs.existsSync(LOGO_PATH)) {
    logoBuffer = await sharp(LOGO_PATH)
      .resize(110, 110, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();
  }

  // 3. Create SVG overlay for high-precision technical text, HUD brackets, and branding
  const svgOverlay = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="overlay-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#080E1A" stop-opacity="0.92"/>
          <stop offset="50%" stop-color="#0A1122" stop-opacity="0.88"/>
          <stop offset="100%" stop-color="#050811" stop-opacity="0.96"/>
        </linearGradient>
        <linearGradient id="amber-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#F59E0B" stop-opacity="1"/>
          <stop offset="50%" stop-color="#D97706" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#F59E0B" stop-opacity="0.2"/>
        </linearGradient>
      </defs>

      <!-- Background Gradient Overlay -->
      <rect x="0" y="0" width="${width}" height="${height}" fill="url(#overlay-grad)" />

      <!-- Subtle Industrial Grid Lines -->
      <line x1="80" y1="80" x2="1120" y2="80" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="1" />
      <line x1="80" y1="550" x2="1120" y2="550" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="1" />
      <line x1="80" y1="80" x2="80" y2="550" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="1" />
      <line x1="1120" y1="80" x2="1120" y2="550" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="1" />

      <!-- HUD Precision Corner Brackets -->
      <!-- Top-Left -->
      <path d="M 68 96 L 68 68 L 96 68" fill="none" stroke="#F59E0B" stroke-width="3" />
      <!-- Top-Right -->
      <path d="M 1104 68 L 1132 68 L 1132 96" fill="none" stroke="#F59E0B" stroke-width="3" />
      <!-- Bottom-Left -->
      <path d="M 68 534 L 68 562 L 96 562" fill="none" stroke="#F59E0B" stroke-width="3" />
      <!-- Bottom-Right -->
      <path d="M 1104 562 L 1132 562 L 1132 534" fill="none" stroke="#F59E0B" stroke-width="3" />

      <!-- Telemetry Badge -->
      <rect x="110" y="110" width="340" height="32" rx="2" fill="#131D33" stroke="#F59E0B" stroke-width="1" stroke-opacity="0.6"/>
      <circle cx="126" cy="126" r="4" fill="#10B981" />
      <text x="140" y="131" font-family="'Courier New', monospace" font-size="12" font-weight="bold" fill="#F59E0B" letter-spacing="2">
        PORT HARCOURT • NIGERIA
      </text>

      <!-- Main Headline -->
      <text x="110" y="215" font-family="'Helvetica Neue', Arial, sans-serif" font-size="52" font-weight="900" fill="#FFFFFF" letter-spacing="-1">
        KOD TECHNICAL SERVICES
      </text>

      <!-- Amber Accent Line -->
      <rect x="110" y="235" width="460" height="4" fill="url(#amber-line)" />

      <!-- Subtitle: Rotating Equipment & Oilfield Engineering -->
      <text x="110" y="280" font-family="'Helvetica Neue', Arial, sans-serif" font-size="28" font-weight="700" fill="#E2E8F0">
        Rotating Equipment &amp; Oilfield Engineering
      </text>

      <!-- Scope Description -->
      <text x="110" y="325" font-family="'Helvetica Neue', Arial, sans-serif" font-size="18" font-weight="400" fill="#94A3B8">
        Precision Laser Alignment • Dynamic Balancing • Heavy Pump &amp; Compressor Overhaul
      </text>
      <text x="110" y="355" font-family="'Helvetica Neue', Arial, sans-serif" font-size="18" font-weight="400" fill="#94A3B8">
        Ultra-Modern Machine Shop • Vibration Analysis • Indigenous Technical Procurement
      </text>

      <!-- Engineering Metrics Footer Box -->
      <g transform="translate(110, 420)">
        <!-- Metric 1 -->
        <rect x="0" y="0" width="220" height="80" rx="2" fill="#0D172B" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1"/>
        <text x="20" y="32" font-family="'Courier New', monospace" font-size="11" font-weight="bold" fill="#F59E0B" letter-spacing="1">DISCIPLINES</text>
        <text x="20" y="62" font-family="'Helvetica Neue', Arial, sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF">11 Core Services</text>

        <!-- Metric 2 -->
        <rect x="240" y="0" width="220" height="80" rx="2" fill="#0D172B" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1"/>
        <text x="260" y="32" font-family="'Courier New', monospace" font-size="11" font-weight="bold" fill="#10B981" letter-spacing="1">FACILITY</text>
        <text x="260" y="62" font-family="'Helvetica Neue', Arial, sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF">Port Harcourt</text>

        <!-- Metric 3 -->
        <rect x="480" y="0" width="260" height="80" rx="2" fill="#0D172B" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1"/>
        <text x="500" y="32" font-family="'Courier New', monospace" font-size="11" font-weight="bold" fill="#06B6D4" letter-spacing="1">STANDARDS</text>
        <text x="500" y="62" font-family="'Helvetica Neue', Arial, sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF">API 610 / ISO 10816</text>

        <!-- Domain Tag -->
        <rect x="760" y="0" width="210" height="80" rx="2" fill="#0D172B" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="1"/>
        <text x="780" y="32" font-family="'Courier New', monospace" font-size="11" font-weight="bold" fill="#94A3B8" letter-spacing="1">OFFICIAL WEB</text>
        <text x="780" y="62" font-family="'Courier New', monospace" font-size="18" font-weight="bold" fill="#F59E0B">kodtechnical.vercel.app</text>
      </g>
    </svg>
  `;

  const compositeOperations = [
    { input: Buffer.from(svgOverlay), top: 0, left: 0 },
  ];

  if (logoBuffer) {
    // Composite logo at top-right inside HUD frame
    compositeOperations.push({
      input: logoBuffer,
      top: 110,
      left: 970,
    });
  }

  await sharp(bgImageBuffer)
    .composite(compositeOperations)
    .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
    .toFile(OUTPUT_PATH);

  console.log(`Open Graph image created successfully at: ${OUTPUT_PATH}`);
}

generateOgImage().catch((err) => {
  console.error("Error generating OG image:", err);
  process.exit(1);
});

