import { ClipLoader } from "react-spinners";
import PostCard from "../../features/blog/components/PostCard";
import PostForm from "../../features/blog/components/PostForm";
import { usePosts } from "../../features/blog/hooks/usePosts";
import { useState } from "react";

export default function Blog() {
  const [page, setPage] = useState<number>(1);
  const { data: posts, isLoading } = usePosts(page);

  return (
    <div
      data-testid="blog-page"
      className="p-8! flex flex-col gap-5 min-h-screen"
    >
      <PostForm />
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center flex-col gap-5">
          <h4 className="font-bold text-sm">Loading Posts...</h4>
          <ClipLoader
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {posts &&
        posts.map((post) => (
          <PostCard
            id={post.id}
            key={post.id}
            title={post.title}
            username={post.username}
            content={post.content}
            createdAt={post.created_datetime}
          />
        ))}
      <div className="flex gap-4 justify-center flex-1 items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="cursor-pointer hover:underline disabled:cursor-not-allowed disabled:text-zinc-500"
        >
          Previous
        </button>

        <span>Page {page}</span>

        <button
          disabled={!posts || posts.length < 5}
          onClick={() => setPage((p) => p + 1)}
          className="cursor-pointer hover:underline disabled:cursor-not-allowed disabled:text-zinc-500"
        >
          Next
        </button>
      </div>
    </div>
  );
}
