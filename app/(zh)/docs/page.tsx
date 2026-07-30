import type { Metadata } from "next";

import DocsPageContent from "@/components/DocsPage";
import LocalizedShell from "@/components/LocalizedShell";
import { createDocsJsonLd, createPageMetadata, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("zh", "docs");

export default function DocsPage() {
  return (
    <LocalizedShell locale="zh">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(createDocsJsonLd("zh")),
        }}
      />
      <DocsPageContent locale="zh" />
    </LocalizedShell>
  );
}
