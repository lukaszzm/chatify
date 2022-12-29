import styles from "./Messages.module.css";
import React, { useEffect, useRef } from "react";
import { Message } from "../Message";
import { LoadingSpinner } from "../../../../components/UI";
import { useMessages } from "../../../../hooks/useMessages";
import { scrollToEnd } from "../../../../utils/scroll-to-end";
import { useAuth } from "../../../../hooks/useAuth";

interface IMessagesProps {
  chatID: string;
}

export const Messages: React.FC<IMessagesProps> = ({ chatID }) => {
  const { authData } = useAuth();
  const messagesEnd = useRef<HTMLDivElement>(null);
  const { data, isLoading, isError } = useMessages(chatID);

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
              isMine={fromId === authData?._id}
              createdAt={createdAt}
            />
          ))
        )}
        <div ref={messagesEnd}></div>
      </div>
    </section>
  );
};
