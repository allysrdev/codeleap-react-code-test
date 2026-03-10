import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getPosts, createPost, updatePost, deletePost } from "./postsApi";

describe("postsApi", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return posts sorted by newest date", async () => {
    const promise = getPosts();

    vi.runAllTimers();

    const result = await promise;

    expect(result.length).toBeGreaterThan(0);
    expect(Date.parse(result[0].created_datetime)).toBeGreaterThanOrEqual(
      Date.parse(result[1].created_datetime),
    );
  });

  it("should create a new post", async () => {
    const promise = createPost({
      title: "New Post",
      content: "Some content",
      username: "Ally",
    });

    vi.runAllTimers();

    const newPost = await promise;

    expect(newPost.id).toBeTypeOf("number");
    expect(newPost.title).toBe("New Post");
    expect(newPost.content).toBe("Some content");
    expect(newPost.username).toBe("Ally");
    expect(newPost.created_datetime).toBeTypeOf("string");
  });

  it("should reject when title is empty", async () => {
    const promise = createPost({
      title: "",
      content: "Content",
      username: "User",
    });

    vi.runAllTimers();

    await expect(promise).rejects.toThrow("Title is required");
  });

  it("should reject when content is empty", async () => {
    const promise = createPost({
      title: "Title",
      content: "",
      username: "User",
    });

    vi.runAllTimers();

    await expect(promise).rejects.toThrow("Content is required");
  });

  it("should reject when username is empty", async () => {
    const promise = createPost({
      title: "Title",
      content: "Content",
      username: "",
    });

    vi.runAllTimers();

    await expect(promise).rejects.toThrow("Username is required");
  });

  it("should update an existing post", async () => {
    const postsPromise = getPosts();
    vi.runAllTimers();
    const posts = await postsPromise;

    const promise = updatePost(posts[0].id, {
      title: "Updated Title",
      content: "Updated Content",
    });

    vi.runAllTimers();

    const updated = await promise;

    expect(updated.title).toBe("Updated Title");
    expect(updated.content).toBe("Updated Content");
  });

  it("should throw error when updating non existing post", async () => {
    const promise = updatePost(99999999, {
      title: "Title",
      content: "Content",
    });

    vi.runAllTimers();

    await expect(promise).rejects.toThrow("Post not found");
  });

  it("should delete a post", async () => {
    const postsPromise = getPosts();

    vi.runAllTimers();

    const posts = await postsPromise;

    const deletePromise = deletePost(posts[0].id);

    vi.runAllTimers();

    const deletedId = await deletePromise;

    expect(deletedId).toBe(posts[0].id);
  });
});
