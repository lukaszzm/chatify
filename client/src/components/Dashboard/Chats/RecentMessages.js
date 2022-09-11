import styles from "./RecentMessages.module.css";
import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../../../hooks/useAxios";
import RecentMessage from "./RecentMessage";
import AuthContext from "../../../store/auth-context";
import { useDispatch, useSelector } from "react-redux";
import {
  initMessages,
  addRecentMessage,
} from "../../../store/recentMessagesSlice";

const RecentMessages = () => {
  const { token, _id: userId, socket } = useContext(AuthContext);
  const { ID } = useParams();
  const [messages, error, loading] = useAxios(
    {
      url: `/messages/get-recent-messages`,
      headers: { Authorization: `Bearer ${token}` },
    },
    true
  );
  const testMessages = useSelector((state) => state.recentMessages.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    if (messages) {
      dispatch(initMessages(messages));
    }
  }, [messages, dispatch]);

  useEffect(() => {
    const receiveHandler = (message) => {
      dispatch(addRecentMessage(message));
    };

    socket.on("receive-message", receiveHandler);

    return () => {
      socket.off("receive-message", receiveHandler);
    };
  }, [socket, dispatch]);

  return (
    <div className={styles.container}>
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : error ? (
        <p>Something went wrong.</p>
      ) : testMessages.length === 0 ? (
        <p>You don't have any chats. Search user above and start chatting.</p>
      ) : (
        testMessages.map(({ _id, userInfo, text, createdAt, fromId }) => (
          <RecentMessage
            key={_id}
            id={userInfo[0]._id}
            firstName={userInfo[0].firstName}
            lastName={userInfo[0].lastName}
            profileImage={userInfo[0].profilePath}
            isActive={ID === userInfo[0]._id ? true : false}
            message={text}
            createdAt={createdAt}
            isMine={fromId === userId ? true : false}
          />
        ))
      )}
    </div>
  );
};

export default RecentMessages;
