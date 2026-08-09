import { NextResponse, type NextRequest } from "next/server";
import { site, whatsappLink } from "@/site.config";

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
  const brand = site.brandName;
  const phone = site.smsNumber;
  const wa = whatsappLink();
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="robots" content="noindex" />
<title>We'll be back soon · ${brand}</title>
<style>
  :root {
    --brand: #0b1f3a;
    --accent: #ea580c;
    --whatsapp: #25d366;
    --ink: #0a0a0a;
    --muted: #57534e;
    --border: #e7e5e4;
    --surface: #fafaf9;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; height: 100%; }
  body {
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    color: var(--ink);
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
    margin: 0 0 16px;
    font-size: 32px;
    line-height: 1.15;
    color: var(--brand);
    letter-spacing: -0.01em;
  }
  p {
    margin: 0 0 24px;
    color: var(--muted);
    font-size: 17px;
    line-height: 1.55;
  }
  .cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 22px;
    border-radius: 999px;
    font-weight: 600;
    font-size: 15px;
    text-decoration: none;
    background: var(--whatsapp);
    color: #fff;
    transition: filter 120ms ease;
  }
  .cta:hover { filter: brightness(0.95); }
  .phone {
    margin-top: 20px;
    font-size: 14px;
    color: var(--muted);
  }
  .phone a { color: var(--brand); text-decoration: none; font-weight: 600; }
  .phone a:hover { text-decoration: underline; }
  .brand {
    margin-top: 28px;
    font-size: 12px;
    color: var(--muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
</style>
</head>
<body>
  <main class="card">
    <p class="eyebrow">Site maintenance</p>
    <h1>We'll be back soon.</h1>
    <p>The site's down for a quick update. Need work done in the meantime? Reach ${site.ownerName} directly.</p>
    <a class="cta" href="${wa}">Chat on WhatsApp</a>
    <p class="phone">Or call <a href="tel:${site.whatsappNumber}">${phone}</a></p>
    <p class="brand">${brand}</p>
  </main>
</body>
</html>`;
}
