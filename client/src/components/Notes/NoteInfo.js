import styles from "./NoteInfo.module.css";
import { useParams } from "react-router-dom";
import NoteContent from "./NoteContent";
import deleteIcon from "../../assets/icons/delete.svg";
import { useQuery } from "@tanstack/react-query";
import { getNoteInfo } from "../../api";
import DeleteNote from "./DeleteNote";
import { useModal } from "../../hooks/useModal";
import ReactDOM from "react-dom";
import { Topbar, LoadingSpinner, Icon, Button } from "../UI";

const NoteInfo = () => {
  const { ID } = useParams();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { data, isLoading, isError } = useQuery(["note", ID], () =>
    getNoteInfo(ID)
  );

  return isLoading ? (
    <LoadingSpinner center />
  ) : isError ? (
    <p>Something went wrong</p>
  ) : data ? (
    <>
      <Topbar backTo="/dashboard/notes">
        <h3>{data.title}</h3>
        <Button className={styles.button} onClick={openModal}>
          <Icon className={styles["delete-icon"]} icon={deleteIcon}>
            Delete Note{" "}
          </Icon>
        </Button>
      </Topbar>
      <NoteContent text={data.text} createdAt={data.createdAt} />
      {isModalOpen
        ? ReactDOM.createPortal(
            <DeleteNote
              noteId={ID}
              isModalOpen={isModalOpen}
              closeModal={closeModal}
            />,
            document.getElementById("modals")
          )
        : null}
    </>
  ) : null;
};

export default NoteInfo;
