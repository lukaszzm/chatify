import { useContext } from "react";
import { useParams } from "react-router-dom";
import RecentMessage from "./RecentMessage";
import AuthContext from "../../../store/auth-context";
import { Container, LoadingSpinner } from "../../UI";
import { useQuery } from "@tanstack/react-query";
import { getRecentMessages } from "../../../api";

const RecentMessages = () => {
  const { _id: userId } = useContext(AuthContext);
  const { ID } = useParams();
  const { data, isLoading, isError } = useQuery(
    ["recent-messages"],
    getRecentMessages
  );

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
