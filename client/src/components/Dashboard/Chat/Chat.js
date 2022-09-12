import styles from "./Chat.module.css";
import { useParams } from "react-router-dom";
import NewMessage from "./NewMessage";
import ChatBox from "./ChatBox";
import ChatInfo from "./ChatInfo";
import Content from "../../UI/Content";

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
        <p className={styles.notification}>Select user to start chatting.</p>
      )}
    </Content>
  );
};

export default Chat;
