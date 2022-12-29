import { useQuery } from "@tanstack/react-query";
import { IMessage } from "../interfaces/Message.interface";
import { getMessages } from "../api";

export const useMessages = (ID: string) => {
  const query = useQuery<IMessage[]>({
    queryKey: ["messages", ID],
    queryFn: () => getMessages(ID),
  });

  return query;
};
