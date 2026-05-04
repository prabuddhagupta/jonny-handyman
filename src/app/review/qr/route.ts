import QRCode from "qrcode";
import { site } from "@/site.config";

// Dynamic QR for the branded /review short URL. Default 800px is print-
// quality for a business card; larger sizes (truck magnets, yard signs)
// via ?size=1600 etc. Capped at 2000 to keep response sane.
export async function GET(request: Request) {
  const url = `https://${site.domain}/review`;
  const requested = Number(new URL(request.url).searchParams.get("size"));
  const size =
    Number.isFinite(requested) && requested > 0
      ? Math.min(2000, Math.max(200, Math.round(requested)))
      : 800;
  const png = await QRCode.toBuffer(url, {
    width: size,
    margin: 1,
    errorCorrectionLevel: "M",
  });
  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Content-Disposition": `inline; filename="qr-review-${size}.png"`,
    },
  });
}
