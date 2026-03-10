import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useContext } from "react";
import { UserProvider } from "./UserProvider";
import { UserContext } from "../contexts/UserContext";

const TestComponent = () => {
  const context = useContext(UserContext);

  if (!context) return null;

  const { user, setUser } = context;

  return (
    <div>
      <span data-testid="username">{user?.username ?? "no-user"}</span>

      <button
        onClick={() =>
          setUser({
            id: 1,
            username: "ally",
          })
        }
      >
        login
      </button>

      <button onClick={() => setUser(null)}>logout</button>
    </div>
  );
};

describe("UserProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("should load user from localStorage on init", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: 1,
        username: "ally",
      }),
    );

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>,
    );

    expect(screen.getByTestId("username").textContent).toBe("ally");
  });

  it("should save user to localStorage when setUser is called", () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>,
    );

    fireEvent.click(screen.getByText("login"));

    const saved = JSON.parse(localStorage.getItem("user") || "{}");

    expect(saved.username).toBe("ally");
  });

  it("should remove user from localStorage when user becomes null", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: 1,
        username: "ally",
      }),
    );

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>,
    );

    fireEvent.click(screen.getByText("logout"));

    expect(localStorage.getItem("user")).toBeNull();
  });
});
