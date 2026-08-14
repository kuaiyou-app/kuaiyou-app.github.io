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

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "The Agentic Skills"
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "用 AI 编写 Android 端侧自动化技能"
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

  it("hides compatibility-test metrics when the catalog has none", () => {
    render(
      <I18nProvider locale="zh">
        <HomePage
          locale="zh"
          skills={[
            {
              id: "open_wechat",
              name: "打开微信",
              description: "打开微信",
              executionMode: "REACTIVE",
              file: "open_wechat.json",
              category: "examples",
              language: "zh",
            },
          ]}
        />
      </I18nProvider>
    );

    expect(screen.getByText("浏览 1 个社区技能。下载或复制后，校验并下发到手机运行。")).toBeInTheDocument();
    expect(screen.queryByText("兼容性验证")).not.toBeInTheDocument();
  });
});
