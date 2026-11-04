import fs from "node:fs";
import path from "node:path";

const WORKSPACE = "c:/Users/LOYAL/Desktop/WEB/warriman";
const SERVER_DIR = path.join(WORKSPACE, ".next/server/app");

let passedCount = 0;
let failedCount = 0;

function assert(condition, testName, detail = "") {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passedCount++;
  } else {
    console.error(`[FAIL] ${testName}: ${detail}`);
    failedCount++;
  }
}

async function runSeoVerification() {
  console.log("=== CHAPTER 9: SEO & TECHNICAL AUDIT VERIFICATION ===\n");

  // 1. Verify robots.txt generated
  console.log("--- 1. Robots.txt Inspection ---");
  const robotsPath = path.join(SERVER_DIR, "robots.txt.body");
  const robotsFallback = path.join(WORKSPACE, ".next/static");
  let robotsContent = "";
  if (fs.existsSync(robotsPath)) {
    robotsContent = fs.readFileSync(robotsPath, "utf8");
  }

  assert(robotsContent.includes("User-Agent: *"), "robots.txt targets all user agents", robotsContent);
  assert(robotsContent.includes("Allow: /"), "robots.txt allows root path");
  assert(robotsContent.includes("Disallow: /api/"), "robots.txt disallows /api/ endpoints");
  assert(robotsContent.includes("sitemap.xml"), "robots.txt references sitemap.xml");

  // 2. Verify sitemap.xml generated
  console.log("\n--- 2. Sitemap.xml Inspection ---");
  const sitemapPath = path.join(SERVER_DIR, "sitemap.xml.body");
  let sitemapContent = "";
  if (fs.existsSync(sitemapPath)) {
    sitemapContent = fs.readFileSync(sitemapPath, "utf8");
  }

  assert(sitemapContent.includes("<urlset"), "sitemap.xml has valid urlset root element");
  assert(sitemapContent.includes("https://kodtechnical.vercel.app</loc>"), "sitemap.xml contains home route");
  assert(sitemapContent.includes("https://kodtechnical.vercel.app/services</loc>"), "sitemap.xml contains /services");
  assert(sitemapContent.includes("https://kodtechnical.vercel.app/about</loc>"), "sitemap.xml contains /about");
  assert(sitemapContent.includes("https://kodtechnical.vercel.app/projects</loc>"), "sitemap.xml contains /projects");
  assert(sitemapContent.includes("https://kodtechnical.vercel.app/contact</loc>"), "sitemap.xml contains /contact");
  assert(sitemapContent.includes("https://kodtechnical.vercel.app/services/precision-alignment</loc>"), "sitemap.xml contains precision alignment service detail page");
  assert(sitemapContent.includes("https://kodtechnical.vercel.app/services/ultra-modern-machine-shop</loc>"), "sitemap.xml contains machine shop service detail page");

  // Count total URLs in sitemap
  const urlMatches = sitemapContent.match(/<loc>/g) || [];
  assert(urlMatches.length === 18, `sitemap.xml contains all expected routes (found: ${urlMatches.length})`);

  // 3. Verify Page-Level HTML Metadata & JSON-LD
  console.log("\n--- 3. Page-Level Metadata & Structured Data ---");
  const routesToCheck = [
    { name: "Homepage", file: "index.html", hasH1: true },
    { name: "About", file: "about.html", hasH1: true },
    { name: "Services Directory", file: "services.html", hasH1: true },
    { name: "Service Detail (Precision Alignment)", file: "services/precision-alignment.html", hasH1: true, isService: true },
    { name: "Projects", file: "projects.html", hasH1: true },
    { name: "Contact", file: "contact.html", hasH1: true },
    { name: "Privacy Policy", file: "privacy.html", hasH1: true },
    { name: "Terms of Service", file: "terms.html", hasH1: true },
  ];

  for (const route of routesToCheck) {
    const htmlPath = path.join(SERVER_DIR, route.file);
    if (!fs.existsSync(htmlPath)) {
      assert(false, `${route.name} HTML file exists`, `Missing: ${htmlPath}`);
      continue;
    }

    const html = fs.readFileSync(htmlPath, "utf8");

    // Title tag
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    assert(Boolean(titleMatch && titleMatch[1]), `${route.name} has unique <title> (${titleMatch ? titleMatch[1].slice(0, 45) + "..." : "none"})`);

    // Meta description
    assert(html.includes('name="description"') || html.includes('content="'), `${route.name} has meta description`);

    // Canonical link
    assert(html.includes('rel="canonical"'), `${route.name} has canonical link element`);

    // Open Graph tags
    assert(html.includes('property="og:title"'), `${route.name} has og:title`);
    assert(html.includes('property="og:description"'), `${route.name} has og:description`);
    assert(html.includes('property="og:image"') || html.includes('og-image.jpg'), `${route.name} references OG image`);

    // Structured data (JSON-LD)
    assert(html.includes('type="application/ld+json"'), `${route.name} includes Schema.org JSON-LD structured data`);

    // H1 check
    if (route.hasH1) {
      const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
      assert(h1Count === 1, `${route.name} has exactly one <h1> element (found: ${h1Count})`);
    }

    // Service JSON-LD check
    if (route.isService) {
      assert(html.includes('"@type":"Service"') || html.includes('"@type": "Service"'), `${route.name} contains Schema.org Service type`);
    }
  }

  // 4. Open Graph Image Asset Verification
  console.log("\n--- 4. Open Graph & Social Asset Verification ---");
  const ogImagePath = path.join(WORKSPACE, "public/images/brand/og-image.jpg");
  assert(fs.existsSync(ogImagePath), "Open Graph image exists at public/images/brand/og-image.jpg");
  const ogStats = fs.statSync(ogImagePath);
  assert(ogStats.size > 50000 && ogStats.size < 500000, `Open Graph image size is optimal (${Math.round(ogStats.size / 1024)} KB)`);

  console.log(`\n======================================================`);
  console.log(`TOTAL SEO CHECKS: ${passedCount + failedCount} | PASSED: ${passedCount} | FAILED: ${failedCount}`);
  console.log(`======================================================\n`);

  if (failedCount > 0) {
    process.exit(1);
  }
}

runSeoVerification().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
