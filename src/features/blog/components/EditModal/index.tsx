import { useState } from "react";
import type { Post } from "../../../../@types/post";
import { useUpdatePost } from "../../hooks/useUpdatePost";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import { createPortal } from "react-dom";

interface EditPostModalProps {
  post: Post;
  onClose: () => void;
}

export default function EditPostModal({ post, onClose }: EditPostModalProps) {
  const { mutate: updatePost } = useUpdatePost();

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    updatePost(
      { id: post.id, data: { title, content } },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  }

  return createPortal(
    <div
      data-testid="edit-modal"
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
    >
      <div className="w-[80%] sm:w-full max-w-xl bg-white p-5! rounded-[10px] flex flex-col gap-5! shadow-lg">
        <h2 className="text-xl font-bold">Edit item</h2>

        <form
          data-testid="edit-post-form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="text-sm">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <label className="text-sm">Content</label>
            <textarea
              className="w-full border p-1.5! rounded-lg"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded-lg bg-white! text-black!"
            >
              Cancel
            </Button>

            <Button type="submit" className="bg-[#47B960]!">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
