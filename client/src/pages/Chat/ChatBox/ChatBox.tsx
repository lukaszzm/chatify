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
          <ChatInfo chatID={ID} />
          <Messages chatID={ID} />
          <NewMessage chatID={ID} />
        </>
      ) : (
        <Notification>Select user to start chatting.</Notification>
      )}
    </Content>
  );
};
