import styles from "./NotesList.module.css";
import Sidebar from "../UI/Sidebar";
import Container from "../UI/Container";
import { useParams } from "react-router-dom";
import Button from "../UI/Button";
import Note from "./Note";
import LoadingSpinner from "../UI/LoadingSpinner";
import NewNote from "./NewNote.js";
import ReactDOM from "react-dom";
import { useModal } from "../../hooks/useModal";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../../api";

const NotesList = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { ID } = useParams();

  const { data, isLoading, isError } = useQuery(["notes"], getNotes);

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
          <p>Something went wrong. can't load your notes.</p>
        ) : data.length === 0 ? (
          <p>You don't have any notes yet.</p>
        ) : data.length > 0 ? (
          data.map(({ title, _id }) => (
            <Note key={_id} id={_id} title={title} isActive={ID === _id} />
          ))
        ) : null}
      </Container>
      {isModalOpen
        ? ReactDOM.createPortal(
            <NewNote isModalOpen={isModalOpen} closeModal={closeModal} />,
            document.getElementById("modals")
          )
        : null}
    </Sidebar>
  );
};

export default NotesList;
