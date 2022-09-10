import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import io from "socket.io-client";
import AuthContext from "../store/auth-context";
import Navigation from "../components/Dashboard/Navigation/Navigation";
import Chats from "../components/Dashboard/Chats/Chats";
import Chat from "../components/Dashboard/Chat/Chat";

const Dashboard = () => {
  const { _id, setSocket, socket } = useContext(AuthContext);
  const { ID } = useParams();
  const isMobile = useMediaQuery({ query: '(max-width:768px)' });

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SOCKET_URL, {});
    setSocket(() => {
      return newSocket;
    });

    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    if (socket) socket.emit("add-user", _id);
  }, [socket, _id]);

  let content = '';

  if(socket) {
    if(isMobile) {
      if(ID) {
        content = <Chat />;
      } else {
        content = <><Chats /> <Navigation /></>;
      }
    } else {
      content = <><Navigation/><Chats/><Chat /></>;
    }
  }
  
  return content;
};

export default Dashboard;
