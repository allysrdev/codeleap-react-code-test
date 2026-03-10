import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from ".";

describe("Button component", () => {
  it("renders the button with children", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click</Button>);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });

  it("should apply custom className (color variant)", () => {
    render(<Button className="bg-red-500">Delete</Button>);

    const button = screen.getByRole("button");

    expect(button).toHaveClass("bg-red-500");
  });

  it("should not trigger click when disabled", () => {
    const handleClick = vi.fn();

    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should display loading text when passed as children", () => {
    render(<Button>Loading...</Button>);

    const button = screen.getByRole("button", { name: /loading/i });

    expect(button).toBeInTheDocument();
  });
});
