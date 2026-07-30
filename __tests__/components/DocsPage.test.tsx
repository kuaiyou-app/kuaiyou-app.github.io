import { render, screen } from "@testing-library/react";

import DocsPageContent from "@/components/DocsPage";
import { I18nProvider } from "@/lib/i18n";
import { APP_DOWNLOAD_URL } from "@/lib/site";

function renderDocs(locale: "zh" | "en" = "zh") {
  return render(
    <I18nProvider locale={locale}>
      <DocsPageContent locale={locale} />
    </I18nProvider>
  );
}

describe("DocsPageContent", () => {
  it("puts the official Android App before CLI setup", () => {
    const view = renderDocs();
    const appSection = view.container.querySelector("#app-install");
    const cliSection = view.container.querySelector("#install");
    const appLink = screen.getByRole("link", { name: /打开官方下载页/ });

    expect(appSection).not.toBeNull();
    expect(cliSection).not.toBeNull();
    expect(
      appSection!.compareDocumentPosition(cliSection!) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(appLink).toHaveAttribute("href", APP_DOWNLOAD_URL);
    expect(appLink).toHaveAttribute("data-analytics-event", "app_download");
  });

  it("uses explicit connection placeholders instead of realistic credentials", () => {
    const view = renderDocs("en");

    expect(view.container).toHaveTextContent("<DEVICE_IP:PORT>");
    expect(view.container).toHaveTextContent("<PAIRING_CODE>");
    expect(view.container).not.toHaveTextContent("192.168.1.100:3847");
    expect(view.container).not.toHaveTextContent("482917");
  });

  it("marks only the current documentation location", () => {
    renderDocs();

    expect(screen.getByRole("link", { name: "简介" })).toHaveAttribute(
      "aria-current",
      "location"
    );
    expect(screen.getByRole("link", { name: "安装 autoace-cli" })).not.toHaveAttribute(
      "aria-current"
    );
  });
});
