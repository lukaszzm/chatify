import styles from "./Chat.module.css";
import { useParams } from "react-router-dom";
import NewMessage from "./NewMessage";
import ChatBox from "./ChatBox";
import ChatInfo from "./ChatInfo";

const Chat = () => {
  const { ID } = useParams();

  return (
    <section className={styles.wrapper}>
      {ID ? (
        <>
          <ChatInfo />
          <ChatBox />
          <NewMessage />
        </>
      ) : (
        <p className={styles.notification}>Select user to start chatting.</p>
      )}
    </section>
  );
};

export default Chat;