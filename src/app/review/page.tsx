import { redirect } from "next/navigation";
import { reviewLink } from "@/site.config";

// Branded short URL — handymanhouserepair.com/review — that 307s to
// the Google review composer. Keeps the destination single-sourced
// via reviewLink() so swapping the FID/Place ID later doesn't break
// printed cards or saved SMS templates.
export default function ReviewRedirect(): never {
  redirect(reviewLink());
}
