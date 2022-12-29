import styles from "./NotesList.module.css";
import { useParams } from "react-router-dom";
import { Note } from "../Note";
import { NewNote } from "../NewNote";
import ReactDOM from "react-dom";
import { useModal } from "../../../hooks/useModal";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../../../api";
import {
  Sidebar,
  Container,
  Button,
  LoadingSpinner,
} from "../../../components/UI";
import { INote } from "../../../interfaces/Note.interface";

export const NotesList = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { ID } = useParams();

  const { data, isLoading, isError } = useQuery<INote[]>({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  return (
    <Sidebar>
      <h1>Your notes</h1>
      <Button className={styles.button} onClick={openModal}>
        Create new note
      </Button>
      <Container>
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <p>Something went wrong. can&apos;t load your notes.</p>
        ) : data.length === 0 ? (
          <p>You don&apos;t have any notes yet.</p>
        ) : data.length > 0 ? (
          data.map(({ title, _id }) => (
            <Note key={_id} id={_id} title={title} isActive={ID === _id} />
          ))
        ) : null}
      </Container>
      {isModalOpen
        ? ReactDOM.createPortal(
            <NewNote closeModal={closeModal} />,
            document.getElementById("modals") as HTMLElement
          )
        : null}
    </Sidebar>
  );
};
