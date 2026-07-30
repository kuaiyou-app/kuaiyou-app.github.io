import type { Metadata } from "next";

import HomePage from "@/components/HomePage";
import LocalizedShell from "@/components/LocalizedShell";
import { createHomeJsonLd, createPageMetadata, serializeJsonLd } from "@/lib/seo";
import { getSkills } from "@/lib/skills";

export const metadata: Metadata = createPageMetadata("zh", "home");

export default function Home() {
  const skills = getSkills();
  return (
    <LocalizedShell locale="zh">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(createHomeJsonLd("zh")),
        }}
      />
      <HomePage skills={skills} locale="zh" />
    </LocalizedShell>
  );
}
