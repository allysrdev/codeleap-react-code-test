import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Layout from ".";
import { MemoryRouter } from "react-router-dom";
import { toast } from "sonner";
import { UserProvider } from "../../../features/auth/providers/UserProvider";

describe("Layout component", () => {
  it("renders header with correct title", () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <Layout />
        </UserProvider>
      </MemoryRouter>,
    );

    const headerTitle = screen.getByText("CodeLeap Network");
    expect(headerTitle).toBeInTheDocument();
  });

  it("renders main content area", () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <Layout />
        </UserProvider>
      </MemoryRouter>,
    );

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });

  it("renders Toaster component and shows a toast", async () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <Layout />
        </UserProvider>
      </MemoryRouter>,
    );

    toast("Hello from test");

    const toastElement = await screen.findByText("Hello from test");
    expect(toastElement).toBeInTheDocument();
  });
});
