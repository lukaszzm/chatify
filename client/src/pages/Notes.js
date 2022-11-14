import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import NotesList from "../components/Notes/NotesList";
import NoteInfo from "../components/Notes/NoteInfo";
import { Content, Notification } from "../components/UI";

const Notes = () => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });
  const { ID } = useParams();
  let content = "";

  if (isMobile) {
    if (ID) {
      content = (
        <Content>
          <NoteInfo />
        </Content>
      );
    } else {
      content = <NotesList />;
    }
  } else {
    content = (
      <>
        <NotesList />
        <Content>
          {ID ? (
            <NoteInfo />
          ) : (
            <Notification>Select existing note or create new.</Notification>
          )}
        </Content>
      </>
    );
  }
  return content;
};

export default Notes;
