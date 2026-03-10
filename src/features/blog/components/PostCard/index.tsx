import { PencilCircleIcon, TrashIcon } from "@phosphor-icons/react";
import { useUser } from "../../../auth/hooks/useUser";
import { useState } from "react";
import type { Post } from "../../../../@types/post";
import EditPostModal from "../EditModal";
import { dateFormatter } from "../../utils/dateFormatter";
import DeletePostModal from "../DeleteModal";

interface PostCardProps {
  id: number;
  title: string;
  username: string;
  content: string;
  createdAt: string;
}

export default function PostCard({
  id,
  title,
  username,
  content,
  createdAt,
}: PostCardProps) {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState<Post | null>();
  const [isDeleting, setIsDeleting] = useState<number | null>();

  function handleRequestEdition() {
    setIsEditing({
      id,
      title,
      username,
      content,
      created_datetime: createdAt,
    });
  }

  function handleRequestDeletion() {
    setIsDeleting(id);
  }

  function handleCloseEdition() {
    setIsEditing(null);
  }

  function handleCloseDeletion() {
    setIsDeleting(null);
  }

  if (isEditing)
    return <EditPostModal post={isEditing!} onClose={handleCloseEdition} />;

  if (isDeleting) {
    return (
      <DeletePostModal postId={isDeleting} onClose={handleCloseDeletion} />
    );
  }

  return (
    <div className="w-full border border-[#999999] rounded-2xl">
      <div className="flex justify-between w-full bg-[#7695EC] p-5! text-white rounded-t-2xl">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div
          className={` gap-5 ${user && user.username == username ? "flex" : "hidden"}`}
        >
          <button
            data-testid="delete-button"
            onClick={handleRequestDeletion}
            className="hover:opacity-80 cursor-pointer"
          >
            <TrashIcon color="#ffffff" size={30} />
          </button>
          <button
            onClick={handleRequestEdition}
            data-testid="edit-button"
            className="hover:opacity-80 cursor-pointer"
          >
            <PencilCircleIcon color="#ffffff" size={30} />
          </button>
        </div>
      </div>

      <div className="flex w-full p-5! flex-col gap-2">
        <div className="flex justify-between text-[#777777]">
          <h3 className="font-bold">@{username}</h3>
          <p>{dateFormatter(createdAt)}</p>
        </div>
        <div className="flex flex-col gap-5">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}
