import styles from "./NewMessage.module.css";
import { useState } from "react";
import sendIcon from "../../../../assets/icons/send.svg";
import { Input, Button } from "../../../../components/UI";
import { useReactQuerySubscription } from "../../../../hooks/useReactQuerySubscription";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newMessage } from "../../../../api";
import { IMessage } from "../../../../interfaces/Message.interface";
import { useAuth } from "../../../../hooks/useAuth";

interface NewMessageProps {
  chatID: string;
}

export const NewMessage: React.FC<NewMessageProps> = ({ chatID }) => {
  const { authData } = useAuth();
  const { socket } = useReactQuerySubscription();
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (message: IMessage) => newMessage(message),
    onSuccess: (message: IMessage) => {
      queryClient.invalidateQueries(["recent-messages"]);
      queryClient.invalidateQueries(["messages"]);
      setInput("");
      if (socket) socket.emit("send-message", message);
    },
    onError: () => {
      setError("Something went wrong. Try again later.");
    },
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() !== "") {
      setError(null);
    }
    setInput(e.target.value);
  };

  const sendMessageHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "") {
      setError("Message cannot be empty.");
      setInput("");
      return;
    }
    if (input.length > 250) {
      setError("Message cannot be longer than 250 characters.");
      return;
    }

    if (!authData) return;

    const message = {
      _id: `${authData._id}${chatID}`,
      text: input,
      fromId: authData._id,
      toId: chatID,
      createdAt: Date.now().toString(),
      userInfo: [
        {
          _id: authData._id,
          firstName: authData.firstName,
          lastName: authData.lastName,
          profileImage: authData.profileImage,
        },
      ],
    };

    mutate(message);
  };

  return (
    <div className={styles.wrapper}>
      {error ? <p className={styles.error}>{error}</p> : null}
      <form className={styles.form} onSubmit={sendMessageHandler}>
        <Input
          className={styles.input}
          onChange={changeHandler}
          placeholder="Enter you message..."
          value={input}
          isError={error !== null}
        />
        <Button disabled={isLoading} className={styles.button}>
          <img src={sendIcon} className={styles.icon} alt="Send Icon." />
        </Button>
      </form>
    </div>
  );
};
