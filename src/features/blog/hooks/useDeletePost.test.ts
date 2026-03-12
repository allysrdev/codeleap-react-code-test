import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDeletePost } from "./useDeletePost";
import { deletePost } from "../api/postsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Post } from "../../../@types/post";

vi.mock("../api/postsApi", () => ({
  deletePost: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn(),
  useQueryClient: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    loading: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("useDeletePost hook", () => {
  const setQueriesDataMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useQueryClient as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setQueriesData: setQueriesDataMock,
    });
  });

  it("should configure useMutation with deletePost as mutationFn", () => {
    renderHook(() => useDeletePost());

    expect(useMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        mutationFn: deletePost,
      }),
    );
  });

  it("should create loading toast on mutate", () => {
    let onMutate: () => { toastId: number };

    (useMutation as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (config) => {
        onMutate = config.onMutate;
        return { mutate: vi.fn() };
      },
    );

    (toast.loading as Mock).mockReturnValue(123);

    renderHook(() => useDeletePost());

    const context = onMutate!();

    expect(toast.loading).toHaveBeenCalledWith("Deleting post...");
    expect(context).toEqual({ toastId: 123 });
  });

  it("should remove post from cache on success", () => {
    let onSuccess: (
      deletedPostId: number,
      variables: number,
      context: { toastId: number },
    ) => void;

    (useMutation as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (config) => {
        onSuccess = config.onSuccess;
        return { mutate: vi.fn() };
      },
    );

    renderHook(() => useDeletePost());

    const context = { toastId: 123 };

    onSuccess!(1, 1, context);

    expect(setQueriesDataMock).toHaveBeenCalledWith(
      { queryKey: ["posts"] },
      expect.any(Function),
    );

    const updater = setQueriesDataMock.mock.calls[0][1];

    const oldPosts: Post[] = [
      {
        id: 1,
        username: "ally",
        title: "Post 1",
        content: "Content 1",
        created_datetime: new Date().toISOString(),
      },
      {
        id: 2,
        username: "john",
        title: "Post 2",
        content: "Content 2",
        created_datetime: new Date().toISOString(),
      },
    ];

    const result = updater(oldPosts);

    expect(result).toEqual([oldPosts[1]]);
  });

  it("should show success toast after deleting", () => {
    let onSuccess: (
      deletedPostId: number,
      variables: number,
      context: { toastId: number },
    ) => void;

    (useMutation as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (config) => {
        onSuccess = config.onSuccess;
        return { mutate: vi.fn() };
      },
    );

    renderHook(() => useDeletePost());

    const context = { toastId: 456 };

    onSuccess!(1, 1, context);

    expect(toast.success).toHaveBeenCalledWith("Post deleted successfully", {
      id: 456,
    });
  });

  it("should show error toast on mutation error", () => {
    let onError: (
      error: Error,
      variables: number,
      context: { toastId: number },
    ) => void;

    (useMutation as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (config) => {
        onError = config.onError;
        return { mutate: vi.fn() };
      },
    );

    renderHook(() => useDeletePost());

    const context = { toastId: 789 };

    onError!(new Error("Network error"), 1, context);

    expect(toast.error).toHaveBeenCalledWith(
      "Error deleting post: Network error",
      { id: 789 },
    );
  });
});
