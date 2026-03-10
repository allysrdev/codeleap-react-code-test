import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Blog from ".";
import { usePosts } from "../../features/blog/hooks/usePosts";
import type { UseQueryResult } from "@tanstack/react-query";
import type { Post } from "../../@types/post";

vi.mock("../../features/blog/hooks/usePosts");

vi.mock("../../features/blog/components/PostCard", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="post-card">{title}</div>
  ),
}));

vi.mock("../../features/blog/components/PostForm", () => ({
  default: () => <div data-testid="post-form">Post Form</div>,
}));

const mockedUsePosts = vi.mocked(usePosts);

function mockUsePosts(value: Partial<UseQueryResult<Post[]>>) {
  mockedUsePosts.mockReturnValue(value as UseQueryResult<Post[]>);
}

describe("Blog", () => {
  it("should show loader while posts are loading", () => {
    mockUsePosts({
      data: undefined,
      isLoading: true,
    });

    render(<Blog />);

    expect(screen.getByText("Loading Posts...")).toBeInTheDocument();
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("should render posts when data is loaded", () => {
    const posts: Post[] = [
      {
        id: 1,
        title: "First post",
        username: "ally",
        content: "hello world",
        created_datetime: "2026-03-10T10:00:00Z",
      },
      {
        id: 2,
        title: "Second post",
        username: "ally",
        content: "another post",
        created_datetime: "2026-03-10T11:00:00Z",
      },
    ];

    mockUsePosts({
      data: posts,
      isLoading: false,
    });

    render(<Blog />);

    const renderedPosts = screen.getAllByTestId("post-card");

    expect(renderedPosts).toHaveLength(2);
    expect(screen.getByText("First post")).toBeInTheDocument();
    expect(screen.getByText("Second post")).toBeInTheDocument();
  });

  it("should always render the PostForm", () => {
    mockUsePosts({
      data: [],
      isLoading: false,
    });

    render(<Blog />);

    expect(screen.getByTestId("post-form")).toBeInTheDocument();
  });
});
