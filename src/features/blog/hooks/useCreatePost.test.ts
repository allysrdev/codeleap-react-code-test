import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useCreatePost } from "./useCreatePost";
import { createPost } from "../api/postsApi";
import {
  useMutation,
  useQueryClient,
  QueryClient,
  type UseMutationOptions,
  type MutationFunctionContext,
  type UseMutationResult,
} from "@tanstack/react-query";
import type { Post } from "../../../@types/post";

vi.mock("../api/postsApi", () => ({
  createPost: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn(),
  useQueryClient: vi.fn(),
}));

describe("useCreatePost hook", () => {
  const setQueryDataMock = vi.fn();
  const invalidateQueriesMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    const queryClientMock: Partial<QueryClient> = {
      setQueryData: setQueryDataMock,
      invalidateQueries: invalidateQueriesMock,
    };

    vi.mocked(useQueryClient).mockReturnValue(queryClientMock as QueryClient);
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

    let onSuccess:
      | ((
          data: Post,
          variables: Post,
          context: unknown,
          mutationContext: MutationFunctionContext,
        ) => unknown)
      | undefined;

    vi.mocked(useMutation).mockImplementation(
      (options: UseMutationOptions<unknown, unknown, unknown, unknown>) => {
        const config = options as UseMutationOptions<Post, Error, Post>;

        onSuccess = config.onSuccess;

        return {
          mutate: vi.fn(),
        } as unknown as UseMutationResult<unknown, unknown, unknown, unknown>;
      },
    );
    renderHook(() => useCreatePost());

    if (!onSuccess) {
      throw new Error("onSuccess not defined");
    }

    onSuccess(newPost, newPost, undefined, {} as MutationFunctionContext);

    expect(setQueryDataMock).toHaveBeenCalledWith(
      ["posts", 1],
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

    expect(invalidateQueriesMock).toHaveBeenCalledWith({
      queryKey: ["posts"],
    });
  });
});
