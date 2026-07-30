import type { Metadata } from "next";

import HomePage from "@/components/HomePage";
import LocalizedShell from "@/components/LocalizedShell";
import { createHomeJsonLd, createPageMetadata, serializeJsonLd } from "@/lib/seo";
import { getSkills } from "@/lib/skills";

export const metadata: Metadata = createPageMetadata("en", "home");

export default function EnglishHome() {
  const skills = getSkills();
  return (
    <LocalizedShell locale="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(createHomeJsonLd("en")),
        }}
      />
      <HomePage skills={skills} locale="en" />
    </LocalizedShell>
  );
}
