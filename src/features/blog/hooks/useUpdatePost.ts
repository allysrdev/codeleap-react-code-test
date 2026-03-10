import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../api/postsApi";
import { toast } from "sonner";

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: { title: string; content: string };
    }) => updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post updated successfully");
    },
    onError: (error) => {
      toast.error(`Error updating post: ${error.message} `);
    },
  });
}
