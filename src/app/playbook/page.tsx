import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const metadata: Metadata = {
  title: "Playbook",
  // Hidden URL — shared directly with John, not for the public web.
  robots: { index: false, follow: false },
};

export default function PlaybookPage() {
  const markdown = fs.readFileSync(
    path.join(process.cwd(), "docs", "playbook.md"),
    "utf-8"
  );
  return (
    <article className="prose prose-stone mx-auto max-w-2xl px-4 py-12 prose-headings:text-[var(--color-brand)] prose-a:text-[var(--color-brand)] prose-code:before:content-none prose-code:after:content-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </article>
  );
}
