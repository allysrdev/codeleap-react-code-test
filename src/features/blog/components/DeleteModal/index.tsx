import { useDeletePost } from "../../hooks/useDeletePost";
import Button from "../../../../components/ui/Button";
import { createPortal } from "react-dom";

interface DeletePostModalProps {
  postId: number;
  onClose: () => void;
}

export default function DeletePostModal({
  postId,
  onClose,
}: DeletePostModalProps) {
  const { mutate: deletePost } = useDeletePost();

  function handleDelete() {
    deletePost(postId, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  return createPortal(
    <div
      data-testid="delete-modal"
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
    >
      <div className="w-[80%] sm:w-full max-w-xl bg-white p-5! rounded-[10px] flex flex-col gap-5! shadow-lg">
        <h2 className="text-xl font-bold">
          Are you sure you want to delete this item?
        </h2>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            onClick={onClose}
            className="border px-4 py-2 rounded-lg bg-white! text-black!"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleDelete}
            className="bg-[#FF5151]!"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
