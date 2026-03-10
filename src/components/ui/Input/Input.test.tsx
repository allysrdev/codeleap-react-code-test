import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import Input from ".";

describe("Input component", () => {
  it("renders the input element", () => {
    render(<Input placeholder="Type here" />);

    const input = screen.getByPlaceholderText("Type here");
    expect(input).toBeInTheDocument();
  });

  it("accepts and displays user input", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here" />);

    const input = screen.getByPlaceholderText("Type here");

    await user.type(input, "Hello");

    expect(input).toHaveValue("Hello");
  });

  it("applies passed props correctly", () => {
    render(<Input id="email-input" type="email" />);

    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("id", "email-input");
    expect(input).toHaveAttribute("type", "email");
  });

  it("forwards ref correctly", () => {
    const ref = createRef<HTMLInputElement>();

    render(<Input ref={ref} placeholder="Ref test" />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("INPUT");
  });
});
