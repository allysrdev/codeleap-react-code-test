import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from ".";
import { useUser } from "../../features/auth/hooks/useUser";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock("../../features/auth/hooks/useUser");

vi.mock("../../features/auth/components/SignUpModal", () => ({
  default: () => <div data-testid="signup-modal">Signup Modal</div>,
}));

const mockedUseUser = vi.mocked(useUser);

describe("Home", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render SignUpModal when user is not logged in", () => {
    mockedUseUser.mockReturnValue({
      user: null,
      setUser: vi.fn(),
    });

    render(<Home />);

    expect(screen.getByTestId("signup-modal")).toBeInTheDocument();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("should navigate to blog when user exists", () => {
    mockedUseUser.mockReturnValue({
      user: { id: 1, username: "ally" },
      setUser: vi.fn(),
    });

    render(<Home />);

    expect(navigateMock).toHaveBeenCalledWith("blog");
  });
});
