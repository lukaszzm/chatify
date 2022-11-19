import styles from "./DeleteNote.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../../api";
import { useNavigate } from "react-router-dom";
import { Modal, Alert } from "../../../components/UI";

export const DeleteNote = ({ noteId, isModalOpen, closeModal }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation((ID) => deleteNote(ID), {
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      navigate("/dashboard/notes/");
    },
  });

  return (
    <Modal
      isOpen={isModalOpen}
      title="Delete Note"
      onConfirm={() => mutate(noteId)}
      isDisabledConfirm={isLoading}
      closeModal={closeModal}
    >
      <p className={styles.text}>
        Are you sure are you want to delete this note
      </p>
      {isError && <Alert error>Something went wrong. Try again later.</Alert>}
    </Modal>
  );
};
