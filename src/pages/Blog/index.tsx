import { ClipLoader } from "react-spinners";
import PostCard from "../../features/blog/components/PostCard";
import PostForm from "../../features/blog/components/PostForm";
import { usePosts } from "../../features/blog/hooks/usePosts";

export default function Blog() {
  const { data: posts, isLoading } = usePosts();

  return (
    <div data-testid="blog-page" className="p-8! flex flex-col gap-5 h-full">
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
    </div>
  );
}
