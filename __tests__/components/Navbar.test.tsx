import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import { APP_DOWNLOAD_URL } from "@/lib/site";

const navigation = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => navigation.pathname,
}));

function renderWithI18n(ui: React.ReactElement, locale: "zh" | "en" = "zh") {
  return render(<I18nProvider locale={locale}>{ui}</I18nProvider>);
}

describe("Navbar", () => {
  beforeEach(() => {
    navigation.pathname = "/";
  });

  it("renders brand and navigation links", () => {
    renderWithI18n(<Navbar />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("首页")).toBeInTheDocument();
    expect(screen.getAllByText("文档")[0]).toBeInTheDocument();
    expect(screen.getByAltText("快游大师 CLI")).toBeInTheDocument();
  });

  it("has GitHub link with external target", () => {
    renderWithI18n(<Navbar />);
    const githubLink = screen.getByLabelText(/GitHub/i);
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("uses locale-aware navigation and language links", () => {
    navigation.pathname = "/en/docs/";
    renderWithI18n(<Navbar />, "en");

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/en");
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("href", "/en/docs");
    expect(screen.getByRole("link", { name: "中文" })).toHaveAttribute("href", "/docs");
    expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute("href", "/en/docs");
  });

  it("exposes the App CTA and tracks it declaratively", () => {
    renderWithI18n(<Navbar />);
    const appLink = screen.getByRole("link", { name: /获取快游大师 App/ });

    expect(appLink).toHaveAttribute("href", APP_DOWNLOAD_URL);
    expect(appLink).toHaveAttribute("data-analytics-event", "app_download");
  });

  it("links the menu button to the menu and closes on Escape", async () => {
    const user = userEvent.setup();
    renderWithI18n(<Navbar />);
    const button = screen.getByRole("button", { name: "打开菜单" });
    const menu = document.getElementById("primary-navigation-menu");

    expect(button).toHaveAttribute("aria-controls", "primary-navigation-menu");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(menu).not.toBeNull();

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(menu?.className).toContain("nav-links-open");

    await user.keyboard("{Escape}");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(menu?.className).not.toContain("nav-links-open");
  });

  it("closes the menu when the route changes", async () => {
    const user = userEvent.setup();
    const view = renderWithI18n(<Navbar />);
    const button = screen.getByRole("button", { name: "打开菜单" });

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    navigation.pathname = "/docs/";
    view.rerender(<I18nProvider locale="zh"><Navbar /></I18nProvider>);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
