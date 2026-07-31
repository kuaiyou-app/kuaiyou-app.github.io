import { render, screen } from "@testing-library/react";

import HomePage from "@/components/HomePage";
import { I18nProvider } from "@/lib/i18n";

vi.mock("@/components/SkillsExplorer", () => ({
  default: () => null,
}));

describe("HomePage", () => {
  it("shows real App screenshots as product proof", () => {
    render(
      <I18nProvider locale="zh">
        <HomePage locale="zh" skills={[]} />
      </I18nProvider>
    );

    expect(screen.getByAltText("快游大师 App 中的自动化技能列表")).toHaveAttribute(
      "src",
      "/screenshots/skill-list.jpg"
    );
    expect(screen.getByAltText("快游大师 App 的运行确认界面")).toHaveAttribute(
      "src",
      "/screenshots/run-confirmation.jpg"
    );
    expect(screen.getByAltText("快游大师 App 的执行成功结果界面")).toHaveAttribute(
      "src",
      "/screenshots/execution-result.jpg"
    );
  });

  it("promotes install via AI Agent with a copyable prompt", () => {
    render(
      <I18nProvider locale="zh">
        <HomePage locale="zh" skills={[]} />
      </I18nProvider>
    );

    const agentLinks = screen.getAllByRole("link", { name: "通过 AI Agent 安装" });
    expect(agentLinks.length).toBeGreaterThanOrEqual(1);
    expect(agentLinks[0]).toHaveAttribute("href", "/docs#agent-install");
    expect(agentLinks[0]).toHaveClass("btn-primary");
    expect(
      screen.getByRole("link", { name: /获取快游大师 App/ })
    ).toHaveClass("btn-secondary");
    expect(
      screen.getByText(
        "帮我安装快游大师 CLI 与 Agent Skill，并配置 MCP：https://kuaiyou-app.github.io/autoace-cli-installation-guide.md"
      )
    ).toBeInTheDocument();
  });
});
