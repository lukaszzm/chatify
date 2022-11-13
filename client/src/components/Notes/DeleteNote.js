import styles from "./DeleteNote.module.css";
import Modal from "../UI/Modal";
import { useMutation } from "@tanstack/react-query";
import { deleteNote } from "../../api";
import { queryClient } from "../..";
import { useNavigate } from "react-router-dom";
import Alert from "../UI/Alert";

const DeleteNote = ({ noteId, isModalOpen, closeModal }) => {
  const navigate = useNavigate();
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

export default DeleteNote;
