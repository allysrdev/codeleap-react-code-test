import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { useUser } from "./features/auth/hooks/useUser";

vi.mock("./features/auth/hooks/useUser");

vi.mock("./pages/Home", () => ({
  default: () => <div data-testid="home-page">Home Page</div>,
}));

vi.mock("./pages/Blog", () => ({
  default: () => <div data-testid="blog-page">Blog Page</div>,
}));

vi.mock("./components/ui/Layout", async () => {
  const { Outlet } =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );

  return {
    default: () => (
      <div data-testid="layout">
        Layout
        <Outlet />
      </div>
    ),
  };
});

const mockedUseUser = vi.mocked(useUser);

describe("App routes", () => {
  it("should render Home on /", () => {
    mockedUseUser.mockReturnValue({
      user: null,
      setUser: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  it("should redirect to Home if accessing /blog without user", () => {
    mockedUseUser.mockReturnValue({
      user: null,
      setUser: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/blog"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId("blog-page")).not.toBeInTheDocument();
  });

  it("should render Blog when user is authenticated", () => {
    mockedUseUser.mockReturnValue({
      user: { id: 1, username: "ally" },
      setUser: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/blog"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("blog-page")).toBeInTheDocument();
  });
});
