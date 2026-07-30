import type { Metadata } from "next";

import DocsPageContent from "@/components/DocsPage";
import LocalizedShell from "@/components/LocalizedShell";
import { createDocsJsonLd, createPageMetadata, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("en", "docs");

export default function EnglishDocsPage() {
  return (
    <LocalizedShell locale="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(createDocsJsonLd("en")),
        }}
      />
      <DocsPageContent locale="en" />
    </LocalizedShell>
  );
}
