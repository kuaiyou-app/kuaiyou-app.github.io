import { render, screen } from "@testing-library/react";

import SkillsExplorer from "@/components/SkillsExplorer";
import { I18nProvider } from "@/lib/i18n";
import type { Skill } from "@/lib/skills";

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

vi.stubGlobal("ResizeObserver", ResizeObserverStub);

const exampleSkill: Skill = {
  id: "open_wechat",
  name: "打开微信",
  description: "打开微信",
  executionMode: "REACTIVE",
  file: "open_wechat.json",
  category: "examples",
  language: "zh",
};

describe("SkillsExplorer", () => {
  it("hides the compatibility-test filter when the catalog has none", () => {
    render(
      <I18nProvider locale="zh">
        <SkillsExplorer skills={[exampleSkill]} baseUrl="/skills" />
      </I18nProvider>
    );

    expect(screen.getByRole("button", { name: "全部" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "示例" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "兼容性测试" })
    ).not.toBeInTheDocument();
  });
});
