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

    expect(screen.getByAltText("快游大师 App 的 MCP 服务设置界面")).toHaveAttribute(
      "src",
      "/screenshots/mcp-settings.jpg"
    );
    expect(screen.getByAltText("快游大师 App 的运行确认界面")).toHaveAttribute(
      "src",
      "/screenshots/run-confirmation.jpg"
    );
    expect(screen.getByAltText("快游大师 App 的执行成功结果界面")).toHaveAttribute(
      "src",
      "/screenshots/execution-result.jpg"
    );
    expect(
      screen.getByAltText("Agent 通过 observe_screen 看到的当前手机屏幕")
    ).toHaveAttribute("src", "/screenshots/skill-list.jpg");
  });

  it("shows an Agent session working with the phone in the hero", () => {
    render(
      <I18nProvider locale="zh">
        <HomePage locale="zh" skills={[]} />
      </I18nProvider>
    );

    expect(
      screen.getByText("粘贴提示词 → 安装 → 配对 → 写技能 → 手机确认")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Agent 会话：安装、配对、看屏、写技能、校验、下发")).toBeInTheDocument();
    expect(screen.getByText("手机 MCP 已开启，帮我配对。")).toBeInTheDocument();
    expect(screen.getByText("pair_device")).toBeInTheDocument();
    expect(
      screen.getByText(
        "启动网易云音乐，确保在首页，点「音乐」，再点「经典」，经典热播里任选一张卡，然后点「播放全部」。"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("npm install -g autoace-cli@latest")).toBeInTheDocument();
    expect(screen.getByText("CLI · Skill · MCP 已就绪")).toBeInTheDocument();
    expect(screen.queryByText(/先 observe_screen/)).not.toBeInTheDocument();
    expect(screen.getByText("observe_screen")).toBeInTheDocument();
    expect(screen.getByText(/netease_play_classic/)).toBeInTheDocument();
    expect(screen.getByText("validate_kuaiyou_skill")).toBeInTheDocument();
    expect(screen.getByText("push_reactive_skill")).toBeInTheDocument();
    expect(screen.getByText("pendingConfirm: true")).toBeInTheDocument();
    expect(screen.getByText("下发后，在手机上确认才会执行")).toBeInTheDocument();
    expect(screen.queryByText("技能列表可随时运行")).not.toBeInTheDocument();
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
    expect(screen.queryByText("AI Agent 开源生态")).not.toBeInTheDocument();
    expect(screen.queryByText("Android 开发与 QA")).not.toBeInTheDocument();
    expect(screen.queryByText("免 Root · 手机确认")).not.toBeInTheDocument();
    expect(screen.getByText("将下方提示词复制给你的 AI 助手")).toBeInTheDocument();
    expect(screen.queryByText("把这段发给 AI，其余按文档走：")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "使用场景" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "打开应用并到达指定页" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "关掉挡路弹窗" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "出现目标按钮点一次" })).toBeInTheDocument();

    expect(
      screen.queryByRole("link", { name: "通过 AI Agent 安装" })
    ).not.toBeInTheDocument();
    const copyPrompt = screen.getByRole("button", { name: "复制提示词" });
    expect(copyPrompt).toHaveClass("btn-primary");
    expect(screen.getByRole("link", { name: "快速开始" })).toHaveAttribute(
      "href",
      "/docs#quickstart"
    );
    expect(screen.queryByRole("heading", { name: "快速开始" })).not.toBeInTheDocument();
    expect(
      screen.queryByText("文档里是 3 步：把提示词发给 AI，手机开 MCP，再写第一个技能。")
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "打开快速上手" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "为什么使用 autoace" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "安全与边界" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "工作原理" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "手机端每一步都可见" })).not.toBeInTheDocument();
    expect(screen.queryByText("哪些部分是开源的？")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /获取快游大师 App/ })
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /获取源码/ })).not.toBeInTheDocument();
    expect(
      screen.queryByText(/通过 MCP 连接 AI 客户端与快游大师/)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/闭源：快游大师 App/)).not.toBeInTheDocument();
    expect(screen.queryByText("局域网 MCP")).not.toBeInTheDocument();
    expect(
      screen.getAllByText(
        "帮我安装快游大师 CLI 与 Agent Skill，并配置 MCP：https://kuaiyou-app.github.io/autoace-cli-installation-guide.md"
      ).length
    ).toBeGreaterThanOrEqual(2);
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
