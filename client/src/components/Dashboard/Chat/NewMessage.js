import styles from "./NewMessage.module.css";
import { useContext, useState } from "react";
import AuthContext from "../../../store/auth-context";
import sendIcon from "../../../assets/icons/send.svg";
import { useParams } from "react-router-dom";
import { Input, Button } from "../../UI";
import { useReactQuerySubscription } from "../../../hooks/useReactQuerySubscription";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newMessage } from "../../../api";

const NewMessage = () => {
  const { ID } = useParams();
  const { _id, firstName, lastName, profileImage } = useContext(AuthContext);
  const { socket } = useReactQuerySubscription();
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation((message) => newMessage(message), {
    onSuccess: (message) => {
      queryClient.invalidateQueries(["recent-messages"]);
      queryClient.invalidateQueries(["messages"]);
      setInput("");
      socket.emit("send-message", {
        ...message,
        userInfo: [
          {
            _id: _id,
            firstName: firstName,
            lastName: lastName,
            profileImage: profileImage,
          },
        ],
      });
    },
    onError: () => {
      setError("Something went wrong. Try again later.");
    },
  });

  const changeHandler = (e) => {
    if (e.target.value.trim() !== "") {
      setError(null);
    }
    setInput(e.target.value);
  };

  const sendMessageHandler = async (e) => {
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

    const message = {
      _id: `${_id}${ID}`,
      text: input,
      fromId: _id,
      toId: ID,
      createdAt: Date.now(),
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
          isError={error}
        />
        <Button disabled={isLoading} className={styles.button}>
          <img src={sendIcon} className={styles.icon} alt="Send Icon." />
        </Button>
      </form>
    </div>
  );
};

export default NewMessage;
