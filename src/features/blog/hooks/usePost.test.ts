import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePosts } from "./usePosts";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { toast } from "sonner";

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

vi.mock("../api/postsApi", () => ({
  getPosts: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("usePosts hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call useQuery with correct queryKey and queryFn", () => {
    const mockQuery: Partial<UseQueryResult> = {
      isError: false,
      error: null,
    };

    vi.mocked(useQuery).mockReturnValue(mockQuery as UseQueryResult);

    renderHook(() => usePosts(1));

    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ["posts", 1],
      queryFn: expect.any(Function),
      placeholderData: expect.any(Function),
    });
  });

  it("should show error toast when query fails", () => {
    const mockQuery: Partial<UseQueryResult> = {
      isError: true,
      error: new Error("Network error"),
    };

    vi.mocked(useQuery).mockReturnValue(mockQuery as UseQueryResult);

    renderHook(() => usePosts(1));

    expect(toast.error).toHaveBeenCalledWith(
      "Failed to fetch posts: Network error",
    );
  });

  it("should not show toast when there is no error", () => {
    const mockQuery: Partial<UseQueryResult> = {
      isError: false,
      error: null,
    };

    vi.mocked(useQuery).mockReturnValue(mockQuery as UseQueryResult);

    renderHook(() => usePosts(1));

    expect(toast.error).not.toHaveBeenCalled();
  });
});
