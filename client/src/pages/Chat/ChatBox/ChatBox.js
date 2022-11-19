import { useParams } from "react-router-dom";
import { NewMessage } from "./NewMessage";
import { Messages } from "./Messages";
import { ChatInfo } from "./ChatInfo";
import { Content, Notification } from "../../../components/UI";

export const ChatBox = () => {
  const { ID } = useParams();

  return (
    <Content>
      {ID ? (
        <>
          <ChatInfo />
          <Messages />
          <NewMessage />
        </>
      ) : (
        <Notification>Select user to start chatting.</Notification>
      )}
    </Content>
  );
};
