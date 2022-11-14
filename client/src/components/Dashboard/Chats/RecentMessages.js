import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import RecentMessage from "./RecentMessage";
import AuthContext from "../../../store/auth-context";
import { Container, LoadingSpinner } from "../../UI";
import { useQuery } from "@tanstack/react-query";
import { getRecentMessages } from "../../../api";
import { queryClient } from "../../..";

const RecentMessages = () => {
  const { _id: userId, socket } = useContext(AuthContext);
  const { ID } = useParams();
  const { data, isLoading, isError } = useQuery(
    ["recent-messages"],
    getRecentMessages
  );

  useEffect(() => {
    const receiveMessageHandler = (message) => {
      const prevMessages = queryClient.getQueryData(["recent-messages"]);
      const newMessages = prevMessages.filter(
        (el) => el.userInfo[0]._id !== message.userInfo[0]._id
      );
      newMessages.unshift(message);
      queryClient.setQueryData(["recent-messages"], newMessages);
    };

    socket.on("receive-message", receiveMessageHandler);

    return () => {
      socket.off("receive-message", receiveMessageHandler);
    };
  }, [socket]);

  return (
    <Container>
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <p>Something went wrong.</p>
      ) : data.length === 0 ? (
        <p>You don't have any chats yet.</p>
      ) : (
        data.map(({ _id, userInfo, text, createdAt, fromId }) => (
          <RecentMessage
            key={_id}
            id={userInfo[0]._id}
            firstName={userInfo[0].firstName}
            lastName={userInfo[0].lastName}
            profileImage={userInfo[0].profileImage}
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
