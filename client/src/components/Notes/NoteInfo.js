import styles from "./NoteInfo.module.css";
import Topbar from "../UI/Topbar";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteContent from "./NoteContent";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useAxios } from "../../hooks/useAxios";
import Icon from "../UI/Icon";
import deleteIcon from "../../assets/icons/delete.svg";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import ReactDOM from "react-dom";
import axios from "axios";
import Alert from '../UI/Alert';
import { useDispatch } from 'react-redux';
import { deleteNote } from "../../store/notesSlice";

const NoteInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [axiosError, setAxiosError] = useState(false);
  const { ID } = useParams();
  const { token } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [note, error, loading] = useAxios(
    {
      url: `/notes/get-note/${ID}`,
      headers: { Authorization: `Bearer ${token}` },
    },
    ID
  );

  const deleteNoteHandler = async () => {
    setAxiosError(null);
    setIsDeleting(true);
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/notes/delete-note/${ID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(deleteNote(ID));
      navigate("/dashboard/notes/");
    } catch (err) {
      setAxiosError("Something went wrong.");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    setAxiosError(null);
  }, [isModalOpen])

  return loading ? (
    <LoadingSpinner center />
  ) : error ? (
    <p>Something went wrong</p>
  ) : (
    <>
      <Topbar backTo="/dashboard/notes">
        <h3>{note.title}</h3>
        <Button
          className={styles.button}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <Icon className={styles["delete-icon"]} icon={deleteIcon}>
            Delete Note{" "}
          </Icon>
        </Button>
      </Topbar>
      <NoteContent text={note.text} createdAt={note.createdAt} />
      {isModalOpen &&
        ReactDOM.createPortal(
          <Modal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            title="Delete Note"
            onConfirm={deleteNoteHandler}
            isDisabledConfirm={isDeleting}
          >
            <p className={styles.text}>
              Are you sure are you want to delete this note
            </p>
            {axiosError && <Alert error>{axiosError}</Alert>}
          </Modal>,
          document.getElementById("modals")
        )}
    </>
  );
};

export default NoteInfo;
