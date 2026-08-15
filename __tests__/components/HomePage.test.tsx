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
      "使用 AI Agent 编写"
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Android 自动化技能"
    );
    expect(screen.getByRole("heading", { level: 1 })).not.toHaveTextContent(
      "The Agentic Skills"
    );
    expect(screen.getByRole("heading", { level: 1 })).not.toHaveTextContent("端侧");
    expect(screen.getByText("The Agentic Skills")).toBeInTheDocument();
    expect(screen.getByText("AI Agent 开源生态")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "适合哪些工作" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "打开应用并到达指定页" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "关掉挡路弹窗" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "出现目标按钮点一次" })).toBeInTheDocument();

    const agentLinks = screen.getAllByRole("link", { name: "通过 AI Agent 安装" });
    expect(agentLinks.length).toBeGreaterThanOrEqual(1);
    expect(agentLinks[0]).toHaveAttribute("href", "/docs");
    expect(agentLinks[0]).toHaveClass("btn-primary");
    expect(screen.getByRole("link", { name: "打开快速上手" })).toHaveAttribute(
      "href",
      "/docs#quickstart"
    );
    expect(screen.queryByText("五步开始你的第一个技能")).not.toBeInTheDocument();
    expect(screen.queryByText("哪些部分是开源的？")).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /获取快游大师 App/ })
    ).toHaveClass("btn-secondary");
    expect(screen.getByRole("link", { name: /获取源码/ })).toHaveAttribute(
      "href",
      "https://github.com/kuaiyou-app/kuaiyou-open-source"
    );
    expect(
      screen.queryByText(/通过 MCP 连接 AI 客户端与快游大师/)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/闭源：快游大师 App/)).not.toBeInTheDocument();
    expect(screen.queryByText("局域网 MCP")).not.toBeInTheDocument();
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
    expect(screen.queryByText("CLI 与 Agent Skill 均已开源")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("当前仓库可验证内容")).not.toBeInTheDocument();
  });
});
