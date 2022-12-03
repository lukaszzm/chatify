import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import AuthContext from "../contexts/auth-context";
import { IMessage } from "../interfaces/Message.interface";

const SOCKET_URL = process.env.REACT_APP_URL as string;

export const useReactQuerySubscription = () => {
  const [socket, setSocket] = useState<Socket>();
  const { _id } = useContext(AuthContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = io(SOCKET_URL, {});

    if (socket) {
      socket.emit("add-user", _id);
      setSocket(socket);
    }

    socket.on("receive-message", (message: IMessage) => {
      const prevMessages = queryClient.getQueryData<IMessage[]>([
        "recent-messages",
      ]);
      if (prevMessages) {
        const newMessages = prevMessages.filter(
          (el: IMessage) => el.userInfo[0]._id !== message.userInfo[0]._id
        );
        newMessages.unshift(message);
        queryClient.setQueryData(["recent-messages"], newMessages);
        queryClient.invalidateQueries(["messages"]);
      }
    });

    return () => {
      socket.close();
    };
  }, [_id, queryClient, setSocket]);

  return { socket };
};
