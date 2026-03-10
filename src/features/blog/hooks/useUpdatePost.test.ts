import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useUpdatePost } from "./useUpdatePost";
import { updatePost } from "../api/postsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Post } from "../../../@types/post";

vi.mock("../api/postsApi", () => ({
  updatePost: vi.fn(),
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

describe("useUpdatePost", () => {
  const invalidateQueriesMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useQueryClient).mockReturnValue({
      invalidateQueries: invalidateQueriesMock,
    } as unknown as ReturnType<typeof useQueryClient>);
  });

  it("should call updatePost inside mutationFn", async () => {
    let mutationFn!: NonNullable<
      Parameters<typeof useMutation>[0]["mutationFn"]
    >;

    vi.mocked(useMutation).mockImplementation((config) => {
      mutationFn = config.mutationFn!;
      return { mutate: vi.fn() } as never;
    });

    const mockPost: Post = {
      id: 1,
      username: "ally",
      title: "Updated",
      content: "Updated content",
      created_datetime: new Date().toISOString(),
    };

    vi.mocked(updatePost).mockResolvedValue(mockPost);

    renderHook(() => useUpdatePost());

    await mutationFn(
      {
        id: 1,
        data: { title: "Updated", content: "Updated content" },
      },
      {} as never,
    );

    expect(updatePost).toHaveBeenCalledWith(1, {
      title: "Updated",
      content: "Updated content",
    });
  });

  it("should create loading toast on mutate", () => {
    let onMutate!: NonNullable<Parameters<typeof useMutation>[0]["onMutate"]>;

    vi.mocked(useMutation).mockImplementation((config) => {
      onMutate = config.onMutate!;
      return { mutate: vi.fn() } as never;
    });

    vi.mocked(toast.loading).mockReturnValue(123);

    renderHook(() => useUpdatePost());

    const context = onMutate(undefined, {} as never);

    expect(toast.loading).toHaveBeenCalledWith("Updating post...");
    expect(context).toEqual({ toastId: 123 });
  });

  it("should invalidate posts query and show success toast", () => {
    let onSuccess!: NonNullable<Parameters<typeof useMutation>[0]["onSuccess"]>;

    vi.mocked(useMutation).mockImplementation((config) => {
      onSuccess = config.onSuccess!;
      return { mutate: vi.fn() } as never;
    });

    renderHook(() => useUpdatePost());

    onSuccess({}, {}, { toastId: 456 }, {} as never);

    expect(invalidateQueriesMock).toHaveBeenCalledWith({
      queryKey: ["posts"],
    });

    expect(toast.success).toHaveBeenCalledWith("Post updated successfully", {
      id: 456,
    });
  });

  it("should show error toast when mutation fails", () => {
    let onError!: NonNullable<Parameters<typeof useMutation>[0]["onError"]>;

    vi.mocked(useMutation).mockImplementation((config) => {
      onError = config.onError!;
      return { mutate: vi.fn() } as never;
    });

    renderHook(() => useUpdatePost());

    onError(new Error("Network error"), {}, { toastId: 789 }, {} as never);

    expect(toast.error).toHaveBeenCalledWith(
      "Error updating post: Network error ",
      { id: 789 },
    );
  });
});
