import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/postsApi";
import type { Post } from "../../../@types/post";
import { toast } from "sonner";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      queryClient.setQueryData(["posts"], (oldPosts: Post[] = []) => [
        newPost,
        ...oldPosts,
      ]);
      toast.success("Post created successfully");
    },
    onError: (error) => {
      toast.error(`Error creating post: ${error.message || "Try again."}`);
    },
  });
}
