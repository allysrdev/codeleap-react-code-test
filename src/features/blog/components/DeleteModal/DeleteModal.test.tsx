import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DeletePostModal from ".";
import { useDeletePost } from "../../hooks/useDeletePost";
import type React from "react";

// Mock do createPortal para renderizar o modal dentro do teste
vi.mock("react-dom", async () => {
  const actual = await vi.importActual("react-dom");
  return {
    ...actual,
    createPortal: (node: React.ReactNode) => node,
  };
});

// Mock do hook useDeletePost
vi.mock("../../hooks/useDeletePost");

const mockDeletePost = vi.fn();

describe("DeletePostModal component", () => {
  const postId = 123;
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useDeletePost as unknown as Mock).mockReturnValue({
      mutate: mockDeletePost,
    });
  });

  it("renders the modal correctly", () => {
    render(<DeletePostModal postId={postId} onClose={onClose} />);

    expect(screen.getByTestId("delete-modal")).toBeDefined();
    expect(
      screen.getByText("Are you sure you want to delete this item?"),
    ).toBeDefined();
    expect(screen.getByText("Cancel")).toBeDefined();
    expect(screen.getByText("Delete")).toBeDefined();
  });

  it("calls onClose when Cancel button is clicked", () => {
    render(<DeletePostModal postId={postId} onClose={onClose} />);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls deletePost and onClose when Delete button is clicked", () => {
    render(<DeletePostModal postId={postId} onClose={onClose} />);

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    // Verifica se a mutação foi chamada com o postId e callback
    expect(mockDeletePost).toHaveBeenCalledTimes(1);
    expect(mockDeletePost).toHaveBeenCalledWith(
      postId,
      expect.any(Object), // callback onSuccess
    );

    // Simula sucesso da mutação chamando onSuccess
    const onSuccessCallback = mockDeletePost.mock.calls[0][1].onSuccess;
    onSuccessCallback?.();

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
