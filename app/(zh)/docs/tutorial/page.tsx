import type { Metadata } from "next";

import TutorialPageContent from "@/components/TutorialPage";
import LocalizedShell from "@/components/LocalizedShell";
import { createPageMetadata, createTutorialJsonLd, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("zh", "tutorial");

export default function TutorialPage() {
  return (
    <LocalizedShell locale="zh">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(createTutorialJsonLd("zh")),
        }}
      />
      <TutorialPageContent locale="zh" />
    </LocalizedShell>
  );
}
