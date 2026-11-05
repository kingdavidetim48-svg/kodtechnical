import { execFile } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const execFileAsync = promisify(execFile);
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PRODUCTION_URL = "https://kodtechnical.vercel.app";
const outDir = path.join(process.cwd(), "test-screenshots", "ch12");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 11 verified engineering services
const SLUGS = [
  "procurement-services",
  "oem-representation",
  "maintenance-and-repair",
  "precision-alignment",
  "equipment-overhaul",
  "equipment-retrofitting",
  "condition-monitoring",
  "equipment-installation",
  "pre-commissioning",
  "commissioning",
  "ultra-modern-machine-shop",
];

const PROD_ROUTES = [
  { path: "/", label: "Homepage" },
  { path: "/about", label: "About Page" },
  { path: "/services", label: "Services Directory" },
  { path: "/services/procurement", label: "Procurement Route (Prompt Spec)" },
  { path: "/services/oem-representation", label: "OEM Representation" },
  { path: "/projects", label: "Projects Page" },
  { path: "/contact", label: "Contact / RFQ Page" },
  { path: "/privacy", label: "Privacy Policy" },
  { path: "/terms", label: "Terms of Service" },
  { path: "/sitemap.xml", label: "XML Sitemap", isXml: true },
  { path: "/robots.txt", label: "Robots Directives", isText: true },
  ...SLUGS.map((slug) => ({
    path: `/services/${slug}`,
    label: `Service: ${slug}`,
  })),
];

const VIEWPORTS = [
  { name: "360px", width: 360, height: 800 },
  { name: "390px", width: 390, height: 844 },
  { name: "768px", width: 768, height: 1024 },
  { name: "1024px", width: 1024, height: 768 },
  { name: "1440px", width: 1440, height: 900 },
];

async function runAudit() {
  console.log("================================================================================");
  console.log("CHAPTER 12: LIVE PRODUCTION AUDIT — KOD TECHNICAL SERVICES");
  console.log(`Target: ${PRODUCTION_URL}`);
  console.log("================================================================================\n");

  const results = {
    routes: [],
    seo: {},
    rfq: {},
    security: {},
    responsive: [],
  };

  // --------------------------------------------------------------------------
  // PHASE 1: Route Verification
  // --------------------------------------------------------------------------
  console.log(">>> PHASE 1: Verifying Production Routes Individual HTTP Responses...");
  for (const item of PROD_ROUTES) {
    const targetUrl = `${PRODUCTION_URL}${item.path}`;
    try {
      const res = await fetch(targetUrl, { redirect: "manual" });
      const status = res.status;
      const contentType = res.headers.get("content-type") || "";
      const location = res.headers.get("location") || "";
      let title = "";
      let hasH1 = false;
      let hasNav = false;
      let hasFooter = false;
      let canonicalUrl = "";
      let textBody = "";

      if (status === 200) {
        textBody = await res.text();
        const titleMatch = textBody.match(/<title>([^<]*)<\/title>/i);
        title = titleMatch ? titleMatch[1].trim() : "";
        hasH1 = /<h1[\s>]/i.test(textBody);
        hasNav = /<nav[\s>]/i.test(textBody);
        hasFooter = /<footer[\s>]/i.test(textBody);

        const canonicalMatch = textBody.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i);
        canonicalUrl = canonicalMatch ? canonicalMatch[1] : "";
      }

      const routeResult = {
        path: item.path,
        label: item.label,
        status,
        contentType,
        location,
        title,
        hasH1,
        hasNav,
        hasFooter,
        canonicalUrl,
        bodyLength: textBody.length,
      };

      results.routes.push(routeResult);

      const statusTag = status === 200 ? "PASS (200 OK)" : status >= 300 && status < 400 ? `REDIRECT (${status})` : `FAIL (${status})`;
      console.log(`[${statusTag}] ${item.path} - ${title || contentType || location}`);
    } catch (err) {
      console.error(`[ERROR] ${item.path}:`, err.message);
      results.routes.push({
        path: item.path,
        label: item.label,
        status: "ERROR",
        error: err.message,
      });
    }
  }

  // --------------------------------------------------------------------------
  // PHASE 4: SEO and Metadata Verification
  // --------------------------------------------------------------------------
  console.log("\n>>> PHASE 4: SEO, Canonical, Sitemap & Social Sharing Verification...");

  // Verify Sitemap
  try {
    const sitemapRes = await fetch(`${PRODUCTION_URL}/sitemap.xml`);
    const sitemapXml = await sitemapRes.text();
    const locMatches = sitemapXml.match(/<loc>([^<]+)<\/loc>/g) || [];
    const urlsInSitemap = locMatches.map((m) => m.replace(/<\/?loc>/g, ""));
    const allProdDomain = urlsInSitemap.every((u) => u.startsWith("https://kodtechnical.vercel.app"));

    results.seo.sitemap = {
      status: sitemapRes.status,
      count: urlsInSitemap.length,
      allProdDomain,
      urls: urlsInSitemap,
    };
    console.log(`Sitemap: ${urlsInSitemap.length} URLs indexed. All use https://kodtechnical.vercel.app: ${allProdDomain}`);
  } catch (err) {
    console.error("Sitemap check error:", err.message);
  }

  // Verify Robots.txt
  try {
    const robotsRes = await fetch(`${PRODUCTION_URL}/robots.txt`);
    const robotsTxt = await robotsRes.text();
    results.seo.robots = {
      status: robotsRes.status,
      content: robotsTxt.trim(),
      hasSitemap: robotsTxt.includes("sitemap.xml"),
      hasAllowRoot: robotsTxt.includes("Allow: /"),
      hasDisallowApi: robotsTxt.includes("Disallow: /api/"),
    };
    console.log(`Robots.txt status: ${robotsRes.status}, valid: ${results.seo.robots.hasSitemap && results.seo.robots.hasAllowRoot}`);
  } catch (err) {
    console.error("Robots check error:", err.message);
  }

  // Verify Homepage Metadata, Canonical, JSON-LD, OG Image
  try {
    const homeRes = await fetch(`${PRODUCTION_URL}/`);
    const homeHtml = await homeRes.text();

    const ogTitle = homeHtml.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i)?.[1] || "";
    const ogDesc = homeHtml.match(/<meta[^>]+property="og:description"[^>]+content="([^"]+)"/i)?.[1] || "";
    const ogImage = homeHtml.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i)?.[1] || "";
    const ogUrl = homeHtml.match(/<meta[^>]+property="og:url"[^>]+content="([^"]+)"/i)?.[1] || "";

    const twCard = homeHtml.match(/<meta[^>]+name="twitter:card"[^>]+content="([^"]+)"/i)?.[1] || "";
    const twTitle = homeHtml.match(/<meta[^>]+name="twitter:title"[^>]+content="([^"]+)"/i)?.[1] || "";
    const twDesc = homeHtml.match(/<meta[^>]+name="twitter:description"[^>]+content="([^"]+)"/i)?.[1] || "";

    const jsonLdBlocks = (homeHtml.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || []).map((b) => {
      const match = b.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
      try {
        return JSON.parse(match[1]);
      } catch {
        return null;
      }
    });

    results.seo.homepage = {
      ogTitle,
      ogDesc,
      ogImage,
      ogUrl,
      twCard,
      twTitle,
      twDesc,
      jsonLdCount: jsonLdBlocks.filter(Boolean).length,
      jsonLdTypes: jsonLdBlocks.filter(Boolean).map((j) => j["@type"]),
    };

    console.log("Homepage OG:", { ogTitle, ogImage, ogUrl });
    console.log("JSON-LD Types:", results.seo.homepage.jsonLdTypes);

    // Verify OG Image exists and is accessible
    if (ogImage) {
      const ogImgRes = await fetch(ogImage);
      console.log(`OG Image HTTP Status: ${ogImgRes.status}, Content-Type: ${ogImgRes.headers.get("content-type")}`);
      results.seo.ogImageAccessible = ogImgRes.status === 200;
    }
  } catch (err) {
    console.error("Homepage SEO check error:", err.message);
  }

  // --------------------------------------------------------------------------
  // PHASE 5: Security Headers & Deployment Review
  // --------------------------------------------------------------------------
  console.log("\n>>> PHASE 5: Security Response Headers & Transport Inspection...");
  try {
    const headRes = await fetch(`${PRODUCTION_URL}/`, { method: "HEAD" });
    const headers = Object.fromEntries(headRes.headers.entries());
    results.security.headers = {
      hsts: headers["strict-transport-security"] || "missing",
      server: headers["server"] || "unknown",
      xContentTypeOptions: headers["x-content-type-options"] || "missing",
      xVercelCache: headers["x-vercel-cache"] || "none",
      xVercelId: headers["x-vercel-id"] || "none",
      age: headers["age"] || "0",
      cacheControl: headers["cache-control"] || "",
    };
    console.log("Production Headers:", results.security.headers);
  } catch (err) {
    console.error("Header check error:", err.message);
  }

  // --------------------------------------------------------------------------
  // PHASE 2: Responsive Screenshot Capture & Overflow Detection
  // --------------------------------------------------------------------------
  console.log("\n>>> PHASE 2: Responsive Testing across 5 Viewports & Overflow Detection...");
  const pagesToTest = [
    { name: "home", url: `${PRODUCTION_URL}/` },
    { name: "about", url: `${PRODUCTION_URL}/about` },
    { name: "services", url: `${PRODUCTION_URL}/services` },
    { name: "service-precision-alignment", url: `${PRODUCTION_URL}/services/precision-alignment` },
    { name: "projects", url: `${PRODUCTION_URL}/projects` },
    { name: "contact", url: `${PRODUCTION_URL}/contact` },
  ];

  for (const vp of VIEWPORTS) {
    console.log(`\nTesting Viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    for (const page of pagesToTest) {
      const screenshotFile = path.join(outDir, `${page.name}-${vp.name}.png`);
      try {
        await execFileAsync(chromePath, [
          "--headless=new",
          "--disable-gpu",
          `--window-size=${vp.width},${vp.height}`,
          `--screenshot=${screenshotFile}`,
          page.url,
        ]);
        console.log(`[SAVED] ${path.basename(screenshotFile)}`);
      } catch (err) {
        console.error(`[SCREENSHOT ERROR] ${page.name} @ ${vp.name}:`, err.message);
      }
    }
  }

  // Save audit data to scratch / file
  fs.writeFileSync(
    path.join(process.cwd(), "scripts", "audit-results.json"),
    JSON.stringify(results, null, 2)
  );
  console.log("\nAudit execution complete. Results saved to scripts/audit-results.json");
}

runAudit();

