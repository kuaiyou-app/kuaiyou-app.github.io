import { render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import LegacyLocaleRedirect from "@/components/LegacyLocaleRedirect";

const replace = vi.fn();
let pathname = "/docs/";
let query = "lang=en";

vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
  useRouter: () => ({ replace }),
  useSearchParams: () => new URLSearchParams(query),
}));

describe("LegacyLocaleRedirect", () => {
  beforeEach(() => {
    replace.mockReset();
    pathname = "/docs/";
    query = "lang=en";
    window.history.replaceState({}, "", "/docs/");
  });

  it("redirects the legacy English query and preserves query/hash state", async () => {
    query = "lang=en&source=legacy";
    window.history.replaceState({}, "", "/docs/?lang=en&source=legacy#install");
    render(<LegacyLocaleRedirect />);

    await waitFor(() => {
      expect(replace).toHaveBeenCalledWith(
        "/en/docs/?source=legacy#install",
        { scroll: false },
      );
    });
  });

  it("does nothing when the legacy language query is absent", async () => {
    query = "source=legacy";
    render(<LegacyLocaleRedirect />);

    await waitFor(() => expect(replace).not.toHaveBeenCalled());
  });
});
