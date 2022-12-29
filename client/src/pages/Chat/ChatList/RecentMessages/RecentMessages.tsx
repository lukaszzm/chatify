import { useContext } from "react";
import { useParams } from "react-router-dom";
import { RecentMessage } from "../RecentMessage";
import AuthContext from "../../../../contexts/auth-context";
import { Container, LoadingSpinner } from "../../../../components/UI";
import { useQuery } from "@tanstack/react-query";
import { getRecentMessages } from "../../../../api";
import { IMessage } from "../../../../interfaces/Message.interface";

export const RecentMessages = () => {
  const { _id: userId } = useContext(AuthContext);
  const { ID } = useParams();
  const { data, isLoading, isError } = useQuery<IMessage[]>({
    queryKey: ["recent-messages"],
    queryFn: getRecentMessages,
  });

  return (
    <Container>
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <p>Something went wrong.</p>
      ) : data.length === 0 ? (
        <p>You don&apos;t have any chats yet.</p>
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
