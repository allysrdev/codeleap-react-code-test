import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePosts } from "./usePosts";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getPosts } from "../api/postsApi";
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

    renderHook(() => usePosts());

    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ["posts"],
      queryFn: getPosts,
    });
  });

  it("should show error toast when query fails", () => {
    const mockQuery: Partial<UseQueryResult> = {
      isError: true,
      error: new Error("Network error"),
    };

    vi.mocked(useQuery).mockReturnValue(mockQuery as UseQueryResult);

    renderHook(() => usePosts());

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

    renderHook(() => usePosts());

    expect(toast.error).not.toHaveBeenCalled();
  });
});
