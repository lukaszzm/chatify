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
import Container from "../../UI/Container";
import LoadingSpinner from "../../UI/LoadingSpinner";

const RecentMessages = () => {
  const { token, _id: userId, socket } = useContext(AuthContext);
  const { ID } = useParams();
  const [messages, error, loading] = useAxios(
    {
      url: `/messages/get-recent-messages`,
      headers: { Authorization: `Bearer ${token}` },
    }
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
    <Container>
      {loading ? (
        <LoadingSpinner/>
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
    </Container>
  );
};

export default RecentMessages;
