import { NextResponse, type NextRequest } from "next/server";
import { site } from "@/site.config";

export function proxy(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "1") {
    return NextResponse.next();
  }

  return new NextResponse(maintenanceHtml(), {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Retry-After": "3600",
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|svg|webp|ico|woff2?)$).*)",
  ],
};

function maintenanceHtml() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="robots" content="noindex" />
<title>We'll be back soon · ${site.brandName}</title>
<style>
  :root {
    --brand: #0b1f3a;
    --accent: #ea580c;
    --border: #e7e5e4;
    --surface: #fafaf9;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; height: 100%; }
  body {
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    background: var(--surface);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    -webkit-font-smoothing: antialiased;
  }
  .card {
    max-width: 520px;
    width: 100%;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 40px 32px;
    text-align: center;
    box-shadow: 0 12px 32px rgba(11, 31, 58, 0.06);
  }
  .eyebrow {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
    margin: 0 0 12px;
  }
  h1 {
    margin: 0;
    font-size: 32px;
    line-height: 1.15;
    color: var(--brand);
    letter-spacing: -0.01em;
  }
</style>
</head>
<body>
  <main class="card">
    <p class="eyebrow">Site maintenance</p>
    <h1>We'll be back soon.</h1>
  </main>
</body>
</html>`;
}
