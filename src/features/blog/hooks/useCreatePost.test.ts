import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useCreatePost } from "./useCreatePost";
import { createPost } from "../api/postsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../../../@types/post";

// Mock da API
vi.mock("../api/postsApi", () => ({
  createPost: vi.fn(),
}));

// Mock do React Query
vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn(),
  useQueryClient: vi.fn(),
}));

describe("useCreatePost hook", () => {
  const setQueryDataMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock do queryClient
    (useQueryClient as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setQueryData: setQueryDataMock,
    });
  });

  it("should configure useMutation with createPost as mutationFn", () => {
    renderHook(() => useCreatePost());

    expect(useMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        mutationFn: createPost,
      }),
    );
  });

  it("should update posts cache on success", () => {
    const newPost: Post = {
      id: 1,
      username: "allyson",
      title: "Test Post",
      content: "Test content",
      created_datetime: new Date().toISOString(),
    };

    let onSuccess: (post: Post) => void = () => {};

    // Captura o onSuccess passado para o useMutation
    (useMutation as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (config) => {
        onSuccess = config.onSuccess;
        return { mutate: vi.fn() };
      },
    );

    renderHook(() => useCreatePost());

    // Simula sucesso da mutation
    onSuccess(newPost);

    expect(setQueryDataMock).toHaveBeenCalledWith(
      ["posts"],
      expect.any(Function),
    );

    const updater = setQueryDataMock.mock.calls[0][1];

    const oldPosts: Post[] = [
      {
        id: 2,
        username: "john",
        title: "Old Post",
        content: "Old content",
        created_datetime: new Date().toISOString(),
      },
    ];

    const result = updater(oldPosts);

    expect(result).toEqual([newPost, ...oldPosts]);
  });
});
