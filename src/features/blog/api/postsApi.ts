import type { Post } from "../../../@types/post";

let posts: Post[] = [
  {
    id: 0,
    content: "",
    created_datetime: "2026-03-10T01:23:12.673Z",
    title: "Mock Post",
    username: "Test",
  },
  {
    id: 1,
    content: "",
    created_datetime: "2026-02-10T01:23:12.673Z",
    title: "Mock Post 2",
    username: "Test 2",
  },
];

export async function getPosts(): Promise<Post[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (posts.length > 0) {
        resolve(
          posts.sort(
            (a, b) =>
              Date.parse(b.created_datetime) - Date.parse(a.created_datetime),
          ),
        );
      } else {
        reject(new Error("No posts found."));
      }
    }, 500);
  });
}

export async function createPost(post: Omit<Post, "id" | "created_datetime">) {
  return new Promise<Post>((resolve, reject) => {
    setTimeout(() => {
      if (!post.title?.trim()) {
        return reject(new Error("Title is required"));
      }

      if (!post.content?.trim()) {
        return reject(new Error("Content is required"));
      }

      if (!post.username?.trim()) {
        return reject(new Error("Username is required"));
      }
      const newPost = {
        ...post,
        id: Math.floor(Math.random() * 1000000),
        created_datetime: new Date().toISOString(),
      };

      posts = [newPost, ...posts];
      resolve(newPost);
    }, 500);
  });
}

export const updatePost = async (
  id: number,
  data: { title: string; content: string },
): Promise<Post> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = posts.findIndex((post) => post.id === id);

      if (index === -1) {
        reject(new Error("Post not found"));
        return;
      }

      const updatedPost = {
        ...posts[index],
        ...data,
      };

      posts[index] = updatedPost;

      resolve(updatedPost);
    }, 500);
  });
};

export const deletePost = async (id: number): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      posts = posts.filter((post) => post.id !== id);
      resolve(id);
    }, 500);
  });
};
