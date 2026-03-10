import type { Post } from "../../../@types/post";

let posts: Post[] = [
  {
    id: 1,
    username: "John",
    title: "Hello world",
    content: "My first post",
    created_datetime: new Date().toISOString(),
  },
];

export async function getPosts(): Promise<Post[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(posts);
    }, 500);
  });
}

export async function createPost(post: Omit<Post, "id" | "created_datetime">) {
  return new Promise<Post>((resolve) => {
    setTimeout(() => {
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
