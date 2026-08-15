import type { Metadata } from "next";

import TutorialPageContent from "@/components/TutorialPage";
import LocalizedShell from "@/components/LocalizedShell";
import { createPageMetadata, createTutorialJsonLd, serializeJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("en", "tutorial");

export default function EnglishTutorialPage() {
  return (
    <LocalizedShell locale="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(createTutorialJsonLd("en")),
        }}
      />
      <TutorialPageContent locale="en" />
    </LocalizedShell>
  );
}
