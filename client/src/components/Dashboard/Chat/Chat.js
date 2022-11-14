import { useParams } from "react-router-dom";
import NewMessage from "./NewMessage";
import ChatBox from "./ChatBox";
import ChatInfo from "./ChatInfo";
import { Content, Notification } from "../../UI";

const Chat = () => {
  const { ID } = useParams();

  return (
    <Content>
      {ID ? (
        <>
          <ChatInfo />
          <ChatBox />
          <NewMessage />
        </>
      ) : (
        <Notification>Select user to start chatting.</Notification>
      )}
    </Content>
  );
};

export default Chat;
