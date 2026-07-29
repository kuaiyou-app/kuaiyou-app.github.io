import { render, screen } from "@testing-library/react";
import { I18nProvider } from "@/lib/i18n";
import Navbar from "@/components/Navbar";

function renderWithI18n(ui: React.ReactElement) {
  return render(<I18nProvider>{ui}</I18nProvider>);
}

describe("Navbar", () => {
  it("renders brand and navigation links", () => {
    renderWithI18n(<Navbar />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("首页")).toBeInTheDocument();
    expect(screen.getAllByText("文档")[0]).toBeInTheDocument();
  });

  it("has GitHub link with external target", () => {
    renderWithI18n(<Navbar />);
    const githubLink = screen.getByLabelText(/GitHub/i);
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});
