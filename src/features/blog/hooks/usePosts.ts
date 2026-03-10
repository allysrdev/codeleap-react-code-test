import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/postsApi";
import { toast } from "sonner";
import { useEffect } from "react";

export const usePosts = () => {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(
        `Erro ao carregar posts: ${query.error.message || "Tente novamente."}`,
      );
    }
  }, [query.isError, query.error]);

  return query;
};
