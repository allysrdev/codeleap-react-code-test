import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// O componente está na mesma pasta que o teste
import PostForm from ".";
// Subindo níveis para chegar em hooks, auth e @types
import { useCreatePost } from "../../hooks/useCreatePost";
import { useUser } from "../../../auth/hooks/useUser";
import { toast } from "sonner";

// 1. Mocks das dependências (garantindo que são funções mockáveis)
vi.mock("../../hooks/useCreatePost", () => ({
  useCreatePost: vi.fn(),
}));

vi.mock("../../../auth/hooks/useUser", () => ({
  useUser: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    loading: vi.fn(() => "mockToastId"),
  },
}));

describe("PostForm", () => {
  let mockMutateAsync: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    (useUser as Mock).mockReturnValue({
      user: { username: "testuser" },
    });

    mockMutateAsync = vi.fn();
    (useCreatePost as Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isLoading: false,
    });
  });

  it("should render the form elements correctly", () => {
    render(<PostForm />);
    expect(
      screen.getByRole("heading", { name: /what's on your mind/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
  });

  it("should disable the Create button when fields are empty", () => {
    render(<PostForm />);
    const createButton = screen.getByRole("button", { name: /create/i });
    expect(createButton).toBeDisabled();
  });

  it("should enable the Create button when both fields are filled", () => {
    render(<PostForm />);
    const titleInput = screen.getByLabelText(/title/i);
    const contentTextarea = screen.getByLabelText(/content/i);
    const createButton = screen.getByRole("button", { name: /create/i });

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(contentTextarea, { target: { value: "Test Content" } });

    expect(createButton).not.toBeDisabled();
  });

  it("should call createPost mutate with correct data and clear fields on successful submission", async () => {
    const mockMutateAsync = vi.fn();
    (useCreatePost as Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isLoading: false,
    });

    render(<PostForm />);

    const titleInput = screen.getByLabelText(/title/i);
    const contentTextarea = screen.getByLabelText(/content/i);
    const createButton = screen.getByRole("button", { name: /create/i });

    fireEvent.change(titleInput, { target: { value: "My New Post Title" } });
    fireEvent.change(contentTextarea, {
      target: { value: "My New Post Content" },
    });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledTimes(1);
      expect(mockMutateAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "My New Post Title",
          content: "My New Post Content",
          username: "testuser",
        }),
      );
      expect(titleInput).toHaveValue("");
      expect(contentTextarea).toHaveValue("");
    });
  });

  it("should display an error toast if user is not logged in", async () => {
    (useUser as Mock).mockReturnValue({ user: null });
    const mockMutate = vi.fn();
    (useCreatePost as Mock).mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
    });

    render(<PostForm />);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Title" },
    });
    fireEvent.change(screen.getByLabelText(/content/i), {
      target: { value: "Content" },
    });
    fireEvent.click(screen.getByRole("button", { name: /create/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Sign up to create a new post");
      expect(mockMutate).not.toHaveBeenCalled();
    });
  });
});
