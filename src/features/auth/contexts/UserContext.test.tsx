import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useState, useContext } from "react";
import { UserContext, type UserContextType } from "./UserContext";

const TestComponent = () => {
  const context = useContext(UserContext) as UserContextType;

  return (
    <div>
      <span data-testid="username">
        {context.user ? context.user.username : "no-user"}
      </span>

      <button
        onClick={() =>
          context.setUser({
            id: 1,
            username: "ally",
          })
        }
      >
        set user
      </button>
    </div>
  );
};

const TestProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserContextType["user"]>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

describe("UserContext", () => {
  it("should provide default user as null", () => {
    render(
      <TestProvider>
        <TestComponent />
      </TestProvider>,
    );

    expect(screen.getByTestId("username").textContent).toBe("no-user");
  });

  it("should update user when setUser is called", () => {
    render(
      <TestProvider>
        <TestComponent />
      </TestProvider>,
    );

    fireEvent.click(screen.getByText("set user"));

    expect(screen.getByTestId("username").textContent).toBe("ally");
  });
});
