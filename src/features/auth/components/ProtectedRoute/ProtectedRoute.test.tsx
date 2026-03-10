import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import ProtectedRoute from ".";
import type { User } from "../../../../@types/user";

const renderWithUser = (user: User | null) => {
  render(
    <UserContext.Provider value={{ user, setUser: () => {} }}>
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/" element={<div>Login Page</div>} />

          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </UserContext.Provider>,
  );
};

describe("ProtectedRoute", () => {
  it("should redirect to login when user is not authenticated", () => {
    renderWithUser(null);

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("should render protected content when user is authenticated", () => {
    renderWithUser({
      id: 1,
      username: "ally",
    });

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
