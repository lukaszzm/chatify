import styles from "./ChatBox.module.css";
import { useEffect, useContext, useRef } from "react";
import { useAxios } from "../../../hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../../../store/auth-context";
import { addMessage, initMessages } from "../../../store/chatSlice";
import Message from "./Message";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../../UI";

const scrollToEnd = (ref) => {
  ref.current.scrollIntoView();
};

const ChatBox = () => {
  const { token, _id, socket } = useContext(AuthContext);
  const messagesEnd = useRef();
  const dispatch = useDispatch();
  const { ID } = useParams();
  const messages = useSelector((state) => state.chat.messages);

  const [response, error, loading] = useAxios(
    {
      url: `/messages/get-messages/${ID}`,
      headers: { Authorization: `Bearer ${token}` },
    },
    ID
  );

  useEffect(() => {
    if (response) {
      dispatch(initMessages(response));
    }
  }, [response, dispatch]);

  useEffect(() => {
    const receiveHandler = (message) => {
      if (message.fromId === ID) {
        dispatch(addMessage(message));
      }
    };

    socket.on("receive-message", receiveHandler);

    return () => {
      socket.off("receive-message", receiveHandler);
    };
  }, [ID, token, socket, dispatch]);

  useEffect(() => {
    scrollToEnd(messagesEnd);
  }, [messages]);

  return (
    <section className={styles.container}>
      <div className={styles["chat-box"]}>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <p>Something went wrong!</p>
        ) : messages.length === 0 ? (
          <p>You don't have any messages with this user yet.</p>
        ) : (
          messages.map(({ text, fromId, createdAt }, index) => (
            <Message
              key={index}
              text={text}
              isMine={fromId === _id}
              createdAt={createdAt}
            />
          ))
        )}
        <div ref={messagesEnd}></div>
      </div>
    </section>
  );
};

export default ChatBox;
