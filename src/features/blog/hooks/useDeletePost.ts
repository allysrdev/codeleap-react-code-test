import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../api/postsApi";
import type { Post } from "../../../@types/post";
import { toast } from "sonner";

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (id) => {
      queryClient.setQueryData(["posts"], (oldPosts: Post[] = []) =>
        oldPosts.filter((post) => post.id !== id),
      );
      toast.success("Post deleted successfully");
    },
    onError: (error) => {
      toast.error(`Error deleting post: ${error.message}`);
    },
  });
}
