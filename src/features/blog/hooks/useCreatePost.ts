import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/postsApi";
import type { Post } from "../../../@types/post";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,

    onSuccess: (newPost) => {
      queryClient.setQueryData(["posts", 1], (oldPosts: Post[] = []) => [
        newPost,
        ...oldPosts,
      ]);

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
}
