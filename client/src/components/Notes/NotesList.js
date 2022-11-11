import styles from "./NotesList.module.css";
import Sidebar from "../UI/Sidebar";
import Container from "../UI/Container";
import { useParams } from "react-router-dom";
import Button from "../UI/Button";
import Note from "./Note";
import { useAxios } from "../../hooks/useAxios";
import { useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import NewNote from "./NewNote.js";
import { useDispatch, useSelector } from "react-redux";
import { initNotes } from "../../store/notesSlice";
import ReactDOM from 'react-dom';
import { useModal } from "../../hooks/useModal";

const NotesList = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { token } = useContext(AuthContext);
  const { ID } = useParams();
  const [data, error, loading] = useAxios({
    url: `/notes/get-all-notes`,
    headers: { Authorization: `Bearer ${token}` },
  });
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);

  useEffect(() => {
    if (data) dispatch(initNotes(data));
  }, [data, dispatch]);

  return (
    <Sidebar>
      <h1>Your notes</h1>
      <Button
        className={styles.button}
        onClick={openModal}
      >
        Create new note
      </Button>
      <Container>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <p>Something went wrong. can't load your notes.</p>
        ) : notes.length === 0 ? (
          <p>You don't have any notes yet.</p>
        ) : notes.length > 0 ? (
          notes.map(({ title, _id }) => (
            <Note key={_id} id={_id} title={title} isActive={ID === _id} />
          ))
        ) : null}
      </Container>
      {isModalOpen && ReactDOM.createPortal(
          <NewNote isModalOpen={isModalOpen} closeModal={closeModal} />,
          document.getElementById("modals"))}
      
    </Sidebar>
  );
};

export default NotesList;
