import { Star } from "lucide-react";
import { site, listingLink } from "@/site.config";

export function GoogleRating({ className }: { className?: string }) {
  if (site.googleReviewCount === 0) return null;
  const rating = site.googleRating;
  const count = site.googleReviewCount;
  return (
    <a
      href={listingLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${rating.toFixed(1)} out of 5 stars from ${count} Google ${count === 1 ? "review" : "reviews"}`}
      className={`group inline-flex items-center gap-2.5 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 hover:border-[var(--color-brand)] hover:shadow-sm transition ${className ?? ""}`}
    >
      <span aria-hidden className="flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <StarIcon key={i} fill={Math.max(0, Math.min(1, rating - i))} />
        ))}
      </span>
      <span className="text-sm font-semibold text-[var(--color-ink)]">
        {rating.toFixed(1)}
      </span>
      <span className="text-xs text-[var(--color-muted)] group-hover:text-[var(--color-brand)] transition">
        · {count} Google {count === 1 ? "review" : "reviews"} →
      </span>
    </a>
  );
}

function StarIcon({ fill }: { fill: number }) {
  return (
    <span className="relative inline-block size-4 leading-none">
      <Star className="size-4 absolute inset-0 text-[#f5b300]" />
      <span
        aria-hidden
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${fill * 100}%` }}
      >
        <Star className="size-4 text-[#f5b300] fill-[#f5b300]" />
      </span>
    </span>
  );
}
