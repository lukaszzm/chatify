import styles from "./Messages.module.css";
import React, { useEffect, useContext, useRef } from "react";
import AuthContext from "../../../../contexts/auth-context";
import { Message } from "../Message";
import { LoadingSpinner } from "../../../../components/UI";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../../../api";
import { IMessage } from "../../../../interfaces/Message.interface";

const scrollToEnd = (ref: React.RefObject<HTMLDivElement>) => {
  ref.current!.scrollIntoView();
};

interface IMessagesProps {
  chatID: string;
}

export const Messages: React.FC<IMessagesProps> = ({ chatID }) => {
  const { _id } = useContext(AuthContext);
  const messagesEnd = useRef<HTMLDivElement>(null);
  const { data, isLoading, isError } = useQuery<IMessage[]>(
    ["messages", chatID],
    () => getMessages(chatID)
  );

  useEffect(() => {
    scrollToEnd(messagesEnd);
  }, [data]);

  return (
    <section className={styles.container}>
      <div className={styles["chat-box"]}>
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <p>Something went wrong!</p>
        ) : data.length === 0 ? (
          <p>You don&apos;t have any messages with this user yet.</p>
        ) : (
          data.map(({ text, fromId, createdAt }, index) => (
            <Message
              key={index}
              text={text}
              isMine={fromId === _id}
              createdAt={createdAt}
            />
          ))
        )}
        <div ref={messagesEnd}></div>
      </div>
    </section>
  );
};
