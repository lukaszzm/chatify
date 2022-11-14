import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Chats from "../components/Dashboard/Chats/Chats";
import Chat from "../components/Dashboard/Chat/Chat";
import { useReactQuerySubscription } from "../hooks/useReactQuerySubscription";

const Dashboard = () => {
  useReactQuerySubscription();
  const { ID } = useParams();
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  let content = null;

    if (isMobile) {
      if (ID) {
        content = <Chat />;
      } else {
        content = (
          <>
            <Chats />
          </>
        );
      }
    } else {
      content = (
        <>
          <Chats /> <Chat />
        </>
      );
    }

  return <>{content}</>;
};

export default Dashboard;
