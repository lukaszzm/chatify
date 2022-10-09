import { useParams } from "react-router-dom";
import NewMessage from "./NewMessage";
import ChatBox from "./ChatBox";
import ChatInfo from "./ChatInfo";
import Content from "../../UI/Content";
import Notification from "../../UI/Notification";

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
