import styles from "./Messages.module.css";
import { useEffect, useContext, useRef } from "react";
import AuthContext from "../../../../contexts/auth-context";
import { Message } from "../Message";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../../../../components/UI";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../../../api";

const scrollToEnd = (ref) => {
  ref.current.scrollIntoView();
};

export const Messages = () => {
  const { _id } = useContext(AuthContext);
  const messagesEnd = useRef();
  const { ID } = useParams();
  const { data, isLoading, isError } = useQuery(["messages", ID], () =>
    getMessages(ID)
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
          <p>You don't have any messages with this user yet.</p>
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