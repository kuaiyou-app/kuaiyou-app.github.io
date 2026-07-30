import { Suspense, type ReactNode } from "react";

import AnalyticsBridge from "@/components/AnalyticsBridge";
import Footer from "@/components/Footer";
import LegacyLocaleRedirect from "@/components/LegacyLocaleRedirect";
import Navbar from "@/components/Navbar";
import { I18nProvider, type Locale } from "@/lib/i18n";

const SKIP_LABEL: Record<Locale, string> = {
  zh: "跳到主要内容",
  en: "Skip to main content",
};

export default function LocalizedShell({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  return (
    <I18nProvider locale={locale}>
      <div lang={locale === "zh" ? "zh-CN" : "en"}>
        <a className="skip-link" href="#main-content">
          {SKIP_LABEL[locale]}
        </a>
        {locale === "zh" ? (
          <Suspense fallback={null}>
            <LegacyLocaleRedirect />
          </Suspense>
        ) : null}
        <AnalyticsBridge />
        <Navbar />
        <div className="page-shell">{children}</div>
        <Footer />
      </div>
    </I18nProvider>
  );
}
