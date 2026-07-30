import { render, screen } from "@testing-library/react";

import DocsPageContent from "@/components/DocsPage";
import { I18nProvider } from "@/lib/i18n";
import { APP_DOWNLOAD_URL, CLI_INSTALL_GUIDE_URL } from "@/lib/site";

function renderDocs(locale: "zh" | "en" = "zh") {
  return render(
    <I18nProvider locale={locale}>
      <DocsPageContent locale={locale} />
    </I18nProvider>
  );
}

describe("DocsPageContent", () => {
  it("puts agent install after the App and before manual CLI setup", () => {
    const view = renderDocs();
    const appSection = view.container.querySelector("#app-install");
    const agentSection = view.container.querySelector("#agent-install");
    const cliSection = view.container.querySelector("#install");
    const appLink = screen.getByRole("link", { name: /打开官方下载页/ });
    const guideLink = screen.getByRole("link", {
      name: /查看面向 Agent 的完整安装指南/,
    });

    expect(appSection).not.toBeNull();
    expect(agentSection).not.toBeNull();
    expect(cliSection).not.toBeNull();
    expect(
      appSection!.compareDocumentPosition(agentSection!) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(
      agentSection!.compareDocumentPosition(cliSection!) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(appLink).toHaveAttribute("href", APP_DOWNLOAD_URL);
    expect(appLink).toHaveAttribute("data-analytics-event", "app_download");
    expect(guideLink).toHaveAttribute("href", CLI_INSTALL_GUIDE_URL);
    expect(view.container).toHaveTextContent(
      "帮我安装快游大师 CLI，https://kuaiyou-app.github.io/autoace-cli-installation-guide.md"
    );
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
    expect(
      screen.getByRole("link", { name: "通过 AI Agent 安装" })
    ).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("link", { name: "手动安装 CLI" })).not.toHaveAttribute(
      "aria-current"
    );
  });
});
