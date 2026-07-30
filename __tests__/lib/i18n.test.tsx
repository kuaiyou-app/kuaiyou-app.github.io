import { render, screen } from "@testing-library/react";
import { I18nProvider, useI18n } from "@/lib/i18n";

function TestConsumer() {
  const { locale, t } = useI18n();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="translated">{t("nav.home")}</span>
    </div>
  );
}

describe("I18nProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState({}, "", "/");
  });

  it("defaults to zh locale", () => {
    render(
      <I18nProvider><TestConsumer /></I18nProvider>
    );
    expect(screen.getByTestId("locale")).toHaveTextContent("zh");
    expect(screen.getByTestId("translated")).toHaveTextContent("首页");
  });

  it("renders the locale fixed by its route provider", () => {
    localStorage.setItem("kuaiyou-locale", "zh");
    window.history.replaceState({}, "", "/?lang=zh");
    render(
      <I18nProvider locale="en"><TestConsumer /></I18nProvider>
    );
    expect(screen.getByTestId("locale")).toHaveTextContent("en");
    expect(screen.getByTestId("translated")).toHaveTextContent("Home");
  });

  it("throws when useI18n is used outside provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow(
      "useI18n must be used within I18nProvider"
    );
    spy.mockRestore();
  });
});
