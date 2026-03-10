import PostCard from "../../features/blog/components/PostCard";
import PostForm from "../../features/blog/components/PostForm";
import { usePosts } from "../../features/blog/hooks/usePosts";

export default function Blog() {
  const { data: posts, isLoading } = usePosts();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-8! flex flex-col gap-5 h-full">
      <PostForm />
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
