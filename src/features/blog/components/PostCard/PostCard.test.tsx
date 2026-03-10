import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PostCard from ".";
import { useUser } from "../../../auth/hooks/useUser";

vi.mock("../../../auth/hooks/useUser");
vi.mock("../EditModal", () => ({
  default: vi.fn(({ post, onClose }) => (
    <div data-testid="edit-modal">
      <span>{post.title}</span>
      <button onClick={onClose}>Close</button>
    </div>
  )),
}));
vi.mock("../DeleteModal", () => ({
  default: vi.fn(({ postId, onClose }) => (
    <div data-testid="delete-modal">
      <span>{postId}</span>
      <button onClick={onClose}>Close</button>
    </div>
  )),
}));

// Mock do dateFormatter
vi.mock("../../utils/dateFormatter", () => ({
  dateFormatter: (date: string) => `formatted-${date}`,
}));

describe("PostCard component", () => {
  const mockPost = {
    id: 1,
    title: "Test Post",
    username: "john",
    content: "This is a test post",
    createdAt: "2026-03-10T12:00:00.000Z",
  };

  beforeEach(() => {
    vi.mocked(useUser).mockReturnValue({
      user: { username: "john", id: 0 },
      setUser: vi.fn(),
    });
  });

  it("renders post content correctly", () => {
    render(<PostCard {...mockPost} />);

    expect(screen.getByText(mockPost.title)).toBeDefined();
    expect(screen.getByText(`@${mockPost.username}`)).toBeDefined();
    expect(screen.getByText("This is a test post")).toBeDefined();
    expect(
      screen.getByText("formatted-2026-03-10T12:00:00.000Z"),
    ).toBeDefined();
  });

  it("shows edit and delete buttons only for the post author", () => {
    render(<PostCard {...mockPost} />);
    expect(screen.getByTestId("delete-button")).toBeDefined();
    expect(screen.getByTestId("edit-button")).toBeDefined();
  });

  it("opens edit modal when edit button is clicked", () => {
    render(<PostCard {...mockPost} />);
    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);

    expect(screen.getByTestId("edit-modal")).toBeDefined();
    expect(screen.getByText(mockPost.title)).toBeDefined();
  });

  it("opens delete modal when delete button is clicked", () => {
    render(<PostCard {...mockPost} />);
    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);

    expect(screen.getByTestId("delete-modal")).toBeDefined();
    expect(screen.getByText(String(mockPost.id))).toBeDefined();
  });

  it("closes modals when close button is clicked", () => {
    render(<PostCard {...mockPost} />);

    fireEvent.click(screen.getByTestId("edit-button"));
    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByTestId("edit-modal")).toBeNull();

    fireEvent.click(screen.getByTestId("delete-button"));
    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByTestId("delete-modal")).toBeNull();
  });
});
