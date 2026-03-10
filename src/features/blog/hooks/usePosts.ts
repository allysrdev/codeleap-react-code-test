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
        `Failed to fetch posts: ${query.error.message || "Try again."}`,
      );
    }
  }, [query.isError, query.error]);

  return query;
};
