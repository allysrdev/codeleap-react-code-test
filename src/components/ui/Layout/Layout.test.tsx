import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Layout from ".";
import { MemoryRouter } from "react-router-dom";
import { toast } from "sonner";

describe("Layout component", () => {
  it("renders header with correct title", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );

    const headerTitle = screen.getByText("CodeLeap Network");
    expect(headerTitle).toBeInTheDocument();
  });

  it("renders main content area", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });

  it("renders Toaster component and shows a toast", async () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );

    toast("Hello from test");

    const toastElement = await screen.findByText("Hello from test");
    expect(toastElement).toBeInTheDocument();
  });
});
