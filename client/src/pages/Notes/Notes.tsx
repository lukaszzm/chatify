import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { NotesList } from "./NotesList";
import { NoteInfo } from "./NoteInfo";
import { Content, Notification } from "../../components/UI";

export const Notes = () => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });
  const { ID } = useParams();

  if (isMobile) {
    if (ID) {
      return (
        <Content>
          <NoteInfo noteId={ID} />
        </Content>
      );
    } else {
      return <NotesList />;
    }
  } else {
    return (
      <>
        <NotesList />
        <Content>
          {ID ? (
            <NoteInfo noteId={ID} />
          ) : (
            <Notification>Select existing note or create new.</Notification>
          )}
        </Content>
      </>
    );
  }
};