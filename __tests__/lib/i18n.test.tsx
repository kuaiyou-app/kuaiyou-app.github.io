import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { I18nProvider, useI18n } from "@/lib/i18n";

function TestConsumer() {
  const { locale, setLocale, t } = useI18n();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="translated">{t("nav.home")}</span>
      <button onClick={() => setLocale("en")}>Switch to EN</button>
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

  it("switches to English and persists", async () => {
    const user = userEvent.setup();
    render(
      <I18nProvider><TestConsumer /></I18nProvider>
    );
    await user.click(screen.getByText("Switch to EN"));
    expect(screen.getByTestId("locale")).toHaveTextContent("en");
    expect(screen.getByTestId("translated")).toHaveTextContent("Home");
    expect(localStorage.getItem("kuaiyou-locale")).toBe("en");
  });

  it("throws when useI18n is used outside provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow(
      "useI18n must be used within I18nProvider"
    );
    spy.mockRestore();
  });
});
