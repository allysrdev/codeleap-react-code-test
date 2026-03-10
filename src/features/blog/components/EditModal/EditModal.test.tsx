import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EditPostModal from ".";
import { useUpdatePost } from "../../hooks/useUpdatePost";

// Mock do createPortal para renderizar o modal dentro do teste
vi.mock("react-dom", async () => {
  const actual = await vi.importActual("react-dom");
  return {
    ...actual,
    createPortal: (node: React.ReactNode) => node,
  };
});

// Mock do hook useUpdatePost
vi.mock("../../hooks/useUpdatePost");

const mockUpdatePost = vi.fn();

describe("EditPostModal component", () => {
  const post = {
    username: "testUser",
    created_datetime: new Date().toString(),
    id: 1,
    title: "Old Title",
    content: "Old Content",
  };
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useUpdatePost as unknown as Mock).mockReturnValue({
      mutate: mockUpdatePost,
    });
  });

  it("renders the modal with initial values", () => {
    render(<EditPostModal post={post} onClose={onClose} />);

    // Verifica se o modal está no documento
    expect(screen.getByTestId("edit-modal")).toBeDefined();

    // Inputs estão com os valores iniciais
    expect(screen.getByDisplayValue("Old Title")).toBeDefined();
    expect(screen.getByDisplayValue("Old Content")).toBeDefined();

    // Botões estão visíveis
    expect(screen.getByText("Cancel")).toBeDefined();
    expect(screen.getByText("Save")).toBeDefined();
  });

  it("calls onClose when Cancel button is clicked", () => {
    render(<EditPostModal post={post} onClose={onClose} />);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("updates input values when typed", () => {
    render(<EditPostModal post={post} onClose={onClose} />);

    const titleInput = screen.getByDisplayValue("Old Title");
    const contentTextarea = screen.getByDisplayValue("Old Content");

    fireEvent.change(titleInput, { target: { value: "New Title" } });
    fireEvent.change(contentTextarea, { target: { value: "New Content" } });

    expect((titleInput as HTMLInputElement).value).toBe("New Title");
    expect((contentTextarea as HTMLTextAreaElement).value).toBe("New Content");
  });

  it("calls updatePost and onClose on form submit", () => {
    render(<EditPostModal post={post} onClose={onClose} />);

    const form =
      screen.getByTestId("edit-post-form") || screen.getByTestId("edit-modal");
    const titleInput = screen.getByDisplayValue("Old Title");
    const contentTextarea = screen.getByDisplayValue("Old Content");

    fireEvent.change(titleInput, { target: { value: "Updated Title" } });
    fireEvent.change(contentTextarea, { target: { value: "Updated Content" } });

    fireEvent.submit(form);

    expect(mockUpdatePost).toHaveBeenCalledTimes(1);
    expect(mockUpdatePost).toHaveBeenCalledWith(
      {
        id: post.id,
        data: { title: "Updated Title", content: "Updated Content" },
      },
      expect.any(Object), // callback de onSuccess
    );

    // Simula sucesso da mutação chamando onSuccess
    const onSuccessCallback = mockUpdatePost.mock.calls[0][1].onSuccess;
    onSuccessCallback?.();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
