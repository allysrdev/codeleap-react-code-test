import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserContext } from "../../contexts/UserContext";
import SignUpModal from ".";
import type { User } from "../../../../@types/user";

describe("SignUpModal", () => {
  const setUserMock = vi.fn();

  const renderComponent = (user: User | null = null) => {
    render(
      <UserContext.Provider value={{ user, setUser: setUserMock }}>
        <SignUpModal />
      </UserContext.Provider>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("should render the signup modal", () => {
    renderComponent();

    expect(
      screen.getByText("Welcome to CodeLeap network!"),
    ).toBeInTheDocument();
  });

  it("should focus the username input on mount", () => {
    renderComponent();

    const input = screen.getByLabelText("Username input");

    expect(input).toHaveFocus();
  });

  it("should disable submit button when input is empty", () => {
    renderComponent();

    const button = screen.getByRole("button", { name: /enter/i });

    expect(button).toBeDisabled();
  });

  it("should enable button when user types a username", () => {
    renderComponent();

    const input = screen.getByLabelText("Username input");
    const button = screen.getByRole("button", { name: /enter/i });

    fireEvent.change(input, { target: { value: "ally" } });

    expect(button).not.toBeDisabled();
  });

  it("should call setUser when form is submitted", () => {
    renderComponent();

    const input = screen.getByLabelText("Username input");
    const button = screen.getByRole("button", { name: /enter/i });

    fireEvent.change(input, { target: { value: "ally" } });
    fireEvent.click(button);

    expect(setUserMock).toHaveBeenCalledTimes(1);

    const userArg = setUserMock.mock.calls[0][0];

    expect(userArg.username).toBe("ally");
  });

  it("should store user in localStorage when user exists", () => {
    const user: User = { id: 1, username: "ally" };

    renderComponent(user);

    expect(localStorage.getItem("user")).toBe(JSON.stringify(user));
  });
});
