import { render, within } from "@testing-library/react";

import TutorialPageContent from "@/components/TutorialPage";
import { I18nProvider } from "@/lib/i18n";

function renderTutorial(locale: "zh" | "en" = "zh") {
  return render(
    <I18nProvider locale={locale}>
      <TutorialPageContent locale={locale} />
    </I18nProvider>
  );
}

const TUTORIAL_IDS = [
  "client-pick",
  "workflow",
  "scenarios",
  "app-install",
  "install",
  "agent-skill",
  "recovery",
];

describe("TutorialPageContent (General Tutorial page)", () => {
  it("renders every tutorial section and links back to Quick Start", () => {
    const view = renderTutorial();
    const nav = view.container.querySelector("nav")!;

    for (const id of TUTORIAL_IDS) {
      expect(view.container.querySelector(`#${id}`)).not.toBeNull();
    }
    expect(view.container.querySelector("#introduction")).toBeNull();
    expect(view.container.querySelector("#quickstart")).toBeNull();
    expect(view.container.querySelector("#boundaries")).toBeNull();
    expect(view.container.querySelector("#relations")).toBeNull();
    expect(nav.textContent).toContain("通用教程");
    expect(nav.textContent).toContain("快速开始");
    expect(within(nav as HTMLElement).getByRole("link", { name: "简介" })).toHaveAttribute(
      "href",
      "/docs#introduction"
    );
    expect(
      within(nav as HTMLElement).getByRole("link", { name: "快速上手" })
    ).toHaveAttribute("href", "/docs#quickstart");
    const navLinks = within(nav as HTMLElement).getAllByRole("link");
    expect(navLinks[navLinks.length - 1]).toHaveTextContent("常见问题");
  });

  it("marks the first tutorial section as current by default", () => {
    const view = renderTutorial();
    const nav = within(view.container.querySelector("nav") as HTMLElement);

    expect(nav.getByRole("link", { name: "AI Agent 接入" })).toHaveAttribute(
      "aria-current",
      "location"
    );
    expect(nav.getByRole("link", { name: "默认工作流" })).not.toHaveAttribute(
      "aria-current"
    );
    expect(nav.getByRole("link", { name: "简介" })).not.toHaveAttribute(
      "aria-current"
    );
  });

  it("orders app install before manual CLI before Agent Skill", () => {
    const view = renderTutorial();
    const app = view.container.querySelector("#app-install")!;
    const cli = view.container.querySelector("#install")!;
    const skill = view.container.querySelector("#agent-skill")!;

    expect(
      app.compareDocumentPosition(cli) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(
      cli.compareDocumentPosition(skill) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("uses only placeholder connection info in the config templates", () => {
    const view = renderTutorial("en");
    const pick = view.container.querySelector("#client-pick")!;

    expect(pick.textContent).toContain("<DEVICE_IP:PORT>");
    expect(pick.textContent).toContain("<PAIRING_CODE>");
    expect(pick.textContent).not.toContain("192.168");
    expect(pick.textContent).not.toMatch(/\b\d{6}\b/);
    expect(pick.textContent).toContain("pair_device");
  });

  it("writes scenario paths observe_screen-first without capture_screenshot or get_ui_tree", () => {
    const view = renderTutorial();
    const scenarios = view.container.querySelector("#scenarios")!;

    expect(scenarios.textContent).toContain("打开微信并等到首页");
    expect(scenarios.textContent).toContain("屏幕出现「签到」点一次就结束");
    expect(scenarios.textContent).toContain("observe_screen");
    expect(scenarios.textContent).not.toContain("capture_screenshot");
    expect(scenarios.textContent).not.toContain("get_ui_tree");
    expect(scenarios.textContent).toContain("maxExecutions");
  });

  it("collapses the domain coach learning plan behind a details element", () => {
    const view = renderTutorial();
    const details = view.container.querySelector("#scenarios details");

    expect(details).not.toBeNull();
    expect(details).not.toHaveAttribute("open");
    expect(details!.textContent).toContain("领域教练学习计划");
    expect(details!.textContent).toContain("plans_deploy");
  });

  it("lists forbidden automation patterns", () => {
    const view = renderTutorial();
    const scenarios = view.container.querySelector("#scenarios")!;

    expect(scenarios.textContent).toContain("抖音无限上滑");
    expect(scenarios.textContent).toContain("test_*");
    expect(scenarios.textContent).toContain("ADB");
    expect(scenarios.textContent).toContain("开发者模式免确认");
  });

  it("renders copyable recovery scripts", () => {
    const view = renderTutorial();
    const recovery = view.container.querySelector("#recovery")!;

    expect(recovery.textContent).toContain("工具列表里没有 pair_device");
    expect(recovery.textContent).toContain("AI Agent 接入");
    expect(recovery.textContent).not.toContain("第 A 节");
    expect(recovery.textContent).not.toContain("Section A");
    expect(recovery.textContent).toContain("设备已断开");
    expect(recovery.textContent).toContain("validate_kuaiyou_skill");
    expect(recovery.textContent).toContain("run: true");
    expect(view.container.querySelectorAll("#recovery button").length).toBe(4);
  });

  it("renders scenario cards with copyable prompts", () => {
    const view = renderTutorial();
    const scenarios = view.container.querySelector("#scenarios")!;

    expect(scenarios.querySelectorAll("button").length).toBe(7);
    expect(scenarios.textContent).toContain("给 AI 的提示词");
    expect(scenarios.textContent).toContain("主路径");
    expect(scenarios.textContent).toContain("打开微信并等到首页");
  });
});
