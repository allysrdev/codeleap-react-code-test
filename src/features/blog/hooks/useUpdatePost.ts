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
    onMutate: () => {
      const toastId = Number(toast.loading("Updating post..."));
      return { toastId };
    },

    onSuccess: (_data, _variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post updated successfully", { id: context.toastId });
    },
    onError: (error, _variables, context) => {
      toast.error(`Error updating post: ${error.message} `, {
        id: context?.toastId,
      });
    },
  });
}
