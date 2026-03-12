import type { Post } from "../../../@types/post";

const BASE_URL = "https://dev.codeleap.co.uk/careers";

type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
};

export async function getPosts(page: number, limit: number): Promise<Post[]> {
  const offset = (page - 1) * limit;

  const response = await fetch(`${BASE_URL}/?limit=${limit}&offset=${offset}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data: ApiResponse = await response.json();

  const sorted = data.results.sort(
    (a, b) => Date.parse(b.created_datetime) - Date.parse(a.created_datetime),
  );

  return sorted;
}

export async function createPost(
  post: Omit<Post, "id" | "created_datetime">,
): Promise<Post> {
  if (!post.title?.trim()) {
    throw new Error("Title is required");
  }

  if (!post.content?.trim()) {
    throw new Error("Content is required");
  }

  if (!post.username?.trim()) {
    throw new Error("Username is required");
  }

  const response = await fetch(`${BASE_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  const data: Post = await response.json();

  return data;
}

export const updatePost = async (
  id: number,
  data: { title: string; content: string },
): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status === 404) {
    throw new Error("Post not found");
  }

  if (!response.ok) {
    throw new Error("Failed to update post");
  }

  return response.json();
};

export const deletePost = async (id: number): Promise<number> => {
  const response = await fetch(`${BASE_URL}/${id}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete post");
  }

  return id;
};
