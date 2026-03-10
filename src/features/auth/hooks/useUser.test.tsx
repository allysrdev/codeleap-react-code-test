import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useUser } from "./useUser";

const TestComponent = () => {
  const { user } = useUser();

  return <span data-testid="username">{user?.username}</span>;
};

describe("useUser", () => {
  it("should throw error when used outside UserProvider", () => {
    expect(() => render(<TestComponent />)).toThrow(
      "useUser must be used within a UserProvider",
    );
  });

  it("should return user from context when inside provider", () => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => {
      const [user] = useState({
        id: 1,
        username: "ally",
      });

      return (
        <UserContext.Provider value={{ user, setUser: () => {} }}>
          {children}
        </UserContext.Provider>
      );
    };

    render(
      <Wrapper>
        <TestComponent />
      </Wrapper>,
    );

    expect(screen.getByTestId("username").textContent).toBe("ally");
  });
});
