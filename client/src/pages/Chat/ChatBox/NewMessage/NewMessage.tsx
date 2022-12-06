import styles from "./NewMessage.module.css";
import { useContext, useState } from "react";
import AuthContext from "../../../../contexts/auth-context";
import sendIcon from "../../../../assets/icons/send.svg";
import { Input, Button } from "../../../../components/UI";
import { useReactQuerySubscription } from "../../../../hooks/useReactQuerySubscription";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newMessage } from "../../../../api";
import { IMessage } from "../../../../interfaces/Message.interface";

interface NewMessageProps {
  chatID: string;
}

export const NewMessage: React.FC<NewMessageProps> = ({ chatID }) => {
  const { _id, info } = useContext(AuthContext);
  const { socket } = useReactQuerySubscription();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (message: IMessage) => newMessage(message),
    {
      onSuccess: (message: IMessage) => {
        queryClient.invalidateQueries(["recent-messages"]);
        queryClient.invalidateQueries(["messages"]);
        setInput("");
        if (socket) socket.emit("send-message", message);
      },
      onError: () => {
        setIsError(true);
        setError("Something went wrong. Try again later.");
      },
    }
  );

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() !== "") {
      setIsError(false);
      setError("");
    }
    setInput(e.target.value);
  };

  const sendMessageHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "") {
      setIsError(true);
      setError("Message cannot be empty.");
      setInput("");
      return;
    }
    if (input.length > 250) {
      setIsError(true);
      setError("Message cannot be longer than 250 characters.");
      return;
    }

    if (!_id) return;

    const message = {
      _id: `${_id}${chatID}`,
      text: input,
      fromId: _id,
      toId: chatID,
      createdAt: Date.now().toString(),
      userInfo: [
        {
          _id: _id,
          firstName: info!.firstName,
          lastName: info!.lastName,
          profileImage: info!.profileImage,
        },
      ],
      test: "test",
    };

    mutate(message);
  };

  return (
    <div className={styles.wrapper}>
      {isError ? <p className={styles.error}>{error}</p> : null}
      <form className={styles.form} onSubmit={sendMessageHandler}>
        <Input
          className={styles.input}
          onChange={changeHandler}
          placeholder="Enter you message..."
          value={input}
          isError={isError}
        />
        <Button disabled={isLoading} className={styles.button}>
          <img src={sendIcon} className={styles.icon} alt="Send Icon." />
        </Button>
      </form>
    </div>
  );
};
