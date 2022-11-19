import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import AuthContext from "../contexts/auth-context";

export const useReactQuerySubscription = () => {
const [ socket, setSocket ] = useState(null);
  const { _id } = useContext(AuthContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = io(process.env.REACT_APP_URL, {});

    if (socket) {
        socket.emit("add-user", _id);
        setSocket(socket);
    }

    socket.on("receive-message", (message) => {
      const prevMessages = queryClient.getQueryData(["recent-messages"]);
      const newMessages = prevMessages.filter(
        (el) => el.userInfo[0]._id !== message.userInfo[0]._id
      );
      newMessages.unshift(message);
      queryClient.setQueryData(["recent-messages"], newMessages);
      queryClient.invalidateQueries(["messages"]);
    });

    return () => socket.close();
  }, [_id, queryClient, setSocket])
  
  return { socket };
};
