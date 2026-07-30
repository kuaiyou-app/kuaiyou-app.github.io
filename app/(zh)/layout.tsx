import type { ReactNode } from "react";

import RootDocument, { rootMetadata } from "@/app/document-layout";
import "../globals.css";

export const metadata = rootMetadata;

export default function ChineseRootLayout({ children }: { children: ReactNode }) {
  return <RootDocument language="zh-CN">{children}</RootDocument>;
}
