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
});
