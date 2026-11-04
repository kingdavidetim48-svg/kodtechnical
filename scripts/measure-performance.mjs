/**
 * Performance & HTTP Latency Measurement Script
 * Tests TTFB, response time, and payload headers for key public routes.
 */

const BASE_URL = "http://localhost:3000";

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
  "/sitemap.xml",
  "/robots.txt",
];

async function measureRoute(route) {
  const start = performance.now();
  try {
    const res = await fetch(`${BASE_URL}${route}`, {
      headers: { "Accept-Encoding": "gzip, deflate, br" },
    });
    const duration = performance.now() - start;
    const text = await res.text();
    return {
      route,
      status: res.status,
      durationMs: Math.round(duration),
      bytes: text.length,
      contentType: res.headers.get("content-type") || "unknown",
    };
  } catch (e) {
    return { route, error: e.message };
  }
}

async function run() {
  console.log("=== CHAPTER 9: ROUTE LATENCY & RESPONSE MEASUREMENTS ===\n");
  console.log("Measuring response times against http://localhost:3000...\n");

  const results = [];
  for (const route of routes) {
    const r = await measureRoute(route);
    results.push(r);
    if (r.error) {
      console.log(`[ERR]  ${route} — Error: ${r.error}`);
    } else {
      console.log(
        `[HTTP ${r.status}] ${route.padEnd(42)} — ${String(r.durationMs).padStart(4)}ms — ${Math.round(r.bytes / 1024)} KB (${r.contentType.split(";")[0]})`
      );
    }
  }

  const valid = results.filter((r) => !r.error);
  if (valid.length > 0) {
    const avgDuration = Math.round(
      valid.reduce((acc, r) => acc + r.durationMs, 0) / valid.length
    );
    console.log(`\nAverage Response Latency: ${avgDuration}ms across ${valid.length} routes.`);
  }
}

run().catch(console.error);

