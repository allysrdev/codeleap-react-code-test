import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../api/postsApi";
import type { Post } from "../../../@types/post";
import { toast } from "sonner";

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation<number, Error, number, { toastId: number }>({
    mutationFn: deletePost,

    onMutate: () => {
      const id = Number(toast.loading("Deleting post..."));
      return { toastId: id };
    },

    onSuccess: (deletedPostId, _variables, context) => {
      queryClient.setQueryData<Post[]>(["posts"], (oldPosts = []) =>
        oldPosts.filter((post) => post.id !== deletedPostId),
      );

      if (context) {
        toast.success("Post deleted successfully", { id: context.toastId });
      }
    },

    onError: (error, _variables, context) => {
      if (context) {
        toast.error(`Error deleting post: ${error.message}`, {
          id: context.toastId,
        });
      }
    },
  });
}
