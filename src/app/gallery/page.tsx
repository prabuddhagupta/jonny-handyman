import type { Metadata } from "next";
import { site, galleryPosts } from "@/site.config";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ExternalLink } from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/icons";

export const metadata: Metadata = {
  title: "Recent work",
  description: `Photos of recent handyman and remodel jobs in ${site.primaryCity} and the Main Line.`,
};

export default function GalleryPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-10 md:pt-20">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-accent)]">
          Recent work
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-brand)] leading-tight">
          Real jobs. Real homes. Real results.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">
          Fresh photos land on Jonny&apos;s Instagram after every job. Tap any
          tile to see the full post.
        </p>
        <a
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 font-medium text-[var(--color-brand)] hover:underline"
        >
          <Instagram className="size-5" />
          Follow @{site.instagramHandle}
          <ExternalLink className="size-3.5" />
        </a>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {galleryPosts.map((post, i) => (
            <a
              key={i}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-stone-200 to-stone-300 hover:shadow-lg transition"
              aria-label={`View on Instagram: ${post.caption}`}
            >
              <div className="absolute inset-0 flex items-center justify-center text-stone-500 text-sm">
                IG #{i + 1}
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition flex items-end">
                <div className="p-3 text-white text-sm opacity-0 group-hover:opacity-100 transition">
                  {post.caption}
                </div>
              </div>
            </a>
          ))}
        </div>
        <p className="mt-6 text-xs text-[var(--color-muted)]">
          Placeholder grid. Replace each entry in{" "}
          <code>src/site.config.ts</code> (galleryPosts) with a real Instagram
          post URL and caption. Drop the post image into{" "}
          <code>public/gallery/</code> and reference it from the tile to show
          real thumbnails.
        </p>
      </section>

      <section className="bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-brand)]">
            Want your job in the next post?
          </h2>
          <p className="mt-3 text-[var(--color-muted)]">
            Text Jonny a photo of what needs fixing. Free estimate, no surprise
            fees.
          </p>
          <div className="mt-6 flex justify-center">
            <WhatsAppButton size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
