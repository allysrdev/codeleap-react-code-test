import { useState } from "react";
import type { Post } from "../../../../@types/post";
import Button from "../../../../components/ui/Button";
import { useCreatePost } from "../../hooks/useCreatePost";
import { useUser } from "../../../auth/hooks/useUser";
import Input from "../../../../components/ui/Input";

export default function PostForm() {
  const [newPost, setNewPost] = useState<Post | null>();
  const { mutate: createPost } = useCreatePost();
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (user) createPost({ ...newPost!, username: user?.username });
    else setError("Sign up to create a new post");
    setNewPost(null);
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-full border border-[#999999] bg-white p-5! rounded-2xl flex flex-col gap-5! shadow-lg"
    >
      <h2
        className={`font-bold text-[22px] text-start ${error ? "text-red-500" : ""}`}
      >
        {error ? error : "What's on your mind?"}
      </h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="username">Title</label>
        <Input
          type="text"
          id="title"
          name="title"
          placeholder="Hello world"
          value={newPost?.title || ""}
          onChange={(e) => setNewPost({ ...newPost!, title: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          placeholder="Content here"
          className="border text-sm border-gray-400 p-1.5! w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={newPost?.content || ""}
          onChange={(e) => setNewPost({ ...newPost!, content: e.target.value })}
        />
      </div>
      <div className="w-full flex justify-end">
        <Button type="submit" aria-label="Enter content">
          Create
        </Button>
      </div>
    </form>
  );
}
