import styles from "./NoteInfo.module.css";
import { NoteContent } from "../NoteContent";
import deleteIcon from "../../../assets/icons/delete.svg";
import { useQuery } from "@tanstack/react-query";
import { getNoteInfo } from "../../../api";
import { DeleteNote } from "../DeleteNote";
import { useModal } from "../../../hooks/useModal";
import ReactDOM from "react-dom";
import { Topbar, LoadingSpinner, Icon, Button } from "../../../components/UI";

interface INoteInfoProps {
  noteId: string;
}

export const NoteInfo: React.FC<INoteInfoProps> = ({ noteId }) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => getNoteInfo(noteId),
  });

  return isLoading ? (
    <LoadingSpinner center />
  ) : isError ? (
    <p>Something went wrong</p>
  ) : data ? (
    <>
      <Topbar backTo="/dashboard/notes">
        <h3>{data.title}</h3>
        <Button className={styles.button} onClick={openModal}>
          <Icon
            className={styles["delete-icon"]}
            icon={deleteIcon}
            alt="delete"
          />
        </Button>
      </Topbar>
      <NoteContent text={data.text} createdAt={data.createdAt} />
      {isModalOpen
        ? ReactDOM.createPortal(
            <DeleteNote noteId={noteId} closeModal={closeModal} />,
            document.getElementById("modals") as HTMLElement
          )
        : null}
    </>
  ) : null;
};
