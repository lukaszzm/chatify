import Topbar from "../UI/Topbar";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import NoteContent from "./NoteContent";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useAxios } from "../../hooks/useAxios";

const NoteInfo = () => {
  const { ID } = useParams();
  const { token } = useContext(AuthContext);
  const [note, error, loading] = useAxios(
    {
      url: `/notes/get-note/${ID}`,
      headers: { Authorization: `Bearer ${token}` },
    },
    ID
  );

  return loading ? (
    <LoadingSpinner center />
  ) : error ? (
    <p>Something went wrong</p>
  ) : (
    <>
      <Topbar backTo="/dashboard/notes">
        <h3>{note.title}</h3>
      </Topbar>
      <NoteContent text={note.text} createdAt={note.createdAt} />
    </>
  );
};

export default NoteInfo;
