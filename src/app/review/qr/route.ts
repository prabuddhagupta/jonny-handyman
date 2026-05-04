import QRCode from "qrcode";
import { site } from "@/site.config";

// Dynamic QR for the branded /review short URL. Print-quality at 800px,
// 24h cached. Right-click the served image to drop into business cards,
// stickers, or truck signage.
export async function GET() {
  const url = `https://${site.domain}/review`;
  const png = await QRCode.toBuffer(url, {
    width: 800,
    margin: 1,
    errorCorrectionLevel: "M",
  });
  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Content-Disposition": 'inline; filename="qr-review.png"',
    },
  });
}
