import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../api/postsApi";

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
    },
  });
}
