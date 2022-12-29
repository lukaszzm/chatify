import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../../api";
import { useNavigate } from "react-router-dom";
import { Modal, Alert } from "../../../components/UI";

interface DeleteNoteProps {
  noteId: string;
  closeModal: () => void;
}

export const DeleteNote: React.FC<DeleteNoteProps> = ({
  noteId,
  closeModal,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: (ID: string) => deleteNote(ID),
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      navigate("/dashboard/notes/");
    },
  });

  return (
    <Modal
      title="Delete Note"
      onConfirm={() => mutate(noteId)}
      isDisabledConfirm={isLoading}
      closeModal={closeModal}
    >
      <p>Are you sure are you want to delete this note</p>
      {isError && <Alert error>Something went wrong. Try again later.</Alert>}
    </Modal>
  );
};
