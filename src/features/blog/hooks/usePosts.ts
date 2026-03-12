import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/postsApi";
import { toast } from "sonner";
import { useEffect } from "react";

export const usePosts = (page: number) => {
  const query = useQuery({
    queryKey: ["posts", page],
    queryFn: () => getPosts(page, 5),
    placeholderData: (previousData) => previousData,
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
