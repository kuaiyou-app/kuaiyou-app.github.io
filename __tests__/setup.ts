import "@testing-library/jest-dom/vitest";

// Mock next/font/local — not available outside Next.js build
vi.mock("next/font/local", () => ({
  default: () => ({ className: "mock-font", variable: "--mock-font" }),
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

import React from "react";

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const imgProps = { ...props };
    delete imgProps.fill;
    delete imgProps.priority;
    return React.createElement("img", imgProps);
  },
}));
