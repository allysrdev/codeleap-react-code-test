import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../api/postsApi";
import type { Post } from "../../../@types/post";

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (id) => {
      queryClient.setQueryData(["posts"], (oldPosts: Post[] = []) =>
        oldPosts.filter((post) => post.id !== id),
      );
    },
  });
}
