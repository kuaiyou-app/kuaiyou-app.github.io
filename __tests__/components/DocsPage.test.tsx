import { render, waitFor, within } from "@testing-library/react";
import { useRouter } from "next/navigation";

import DocsPageContent from "@/components/DocsPage";
import { I18nProvider } from "@/lib/i18n";

const replace = vi.fn();

function renderDocs(locale: "zh" | "en" = "zh") {
  return render(
    <I18nProvider locale={locale}>
      <DocsPageContent locale={locale} />
    </I18nProvider>
  );
}

describe("DocsPageContent (Quick Start page)", () => {
  beforeEach(() => {
    replace.mockReset();
    vi.mocked(useRouter).mockReturnValue({
      replace,
      push: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    });
    window.history.replaceState({}, "", "/docs/");
  });

  it("renders the introduction and quick start content", () => {
    const view = renderDocs();

    expect(view.container.querySelector("#introduction")).not.toBeNull();
    expect(view.container.querySelector("#quickstart")).not.toBeNull();
    expect(view.container).toHaveTextContent(
      "帮我安装快游大师 CLI 与 Agent Skill，并配置 MCP：https://kuaiyou-app.github.io/autoace-cli-installation-guide.md"
    );
  });

  it("links to the separate General Tutorial page from the sidebar", () => {
    const view = renderDocs();
    const nav = view.container.querySelector("nav")!;

    expect(nav.textContent).toContain("快速开始");
    expect(nav.textContent).toContain("通用教程");
    expect(within(nav as HTMLElement).getByRole("link", { name: "AI Agent 接入" })).toHaveAttribute(
      "href",
      "/docs/tutorial#client-pick"
    );
    const navLinks = within(nav as HTMLElement).getAllByRole("link");
    expect(navLinks[navLinks.length - 1]).toHaveTextContent("常见问题");
    expect(navLinks[navLinks.length - 1]).toHaveAttribute(
      "href",
      "/docs/tutorial#recovery"
    );
  });

  it("sends retired docs hashes to the General Tutorial page", async () => {
    window.history.replaceState({}, "", "/docs/#install");
    renderDocs();

    await waitFor(() => {
      expect(replace).toHaveBeenCalledWith("/docs/tutorial/#install");
    });
  });

  it("does not render the tutorial page sections here", () => {
    const view = renderDocs();

    for (const id of [
      "client-pick",
      "workflow",
      "scenarios",
      "recovery",
      "app-install",
      "install",
      "agent-skill",
      "boundaries",
      "relations",
    ]) {
      expect(view.container.querySelector(`#${id}`)).toBeNull();
    }
  });

  it("marks only the current documentation location", () => {
    const view = renderDocs();
    const nav = within(view.container.querySelector("nav") as HTMLElement);

    expect(nav.getByRole("link", { name: "简介" })).toHaveAttribute(
      "aria-current",
      "location"
    );
    expect(nav.getByRole("link", { name: "快速上手" })).not.toHaveAttribute(
      "aria-current"
    );
    expect(nav.getByRole("link", { name: "AI Agent 接入" })).not.toHaveAttribute(
      "aria-current"
    );
  });

  it("recommends observe_screen on the first-skill prompt", () => {
    const view = renderDocs();

    expect(view.container).toHaveTextContent("observe_screen");
    expect(view.container).toHaveTextContent("run: true");
    expect(view.container).not.toHaveTextContent(
      "先 capture_screenshot 和 get_ui_tree"
    );
  });
});
