import styles from "./NewMessage.module.css";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addMessage } from "../../../store/chatSlice";
import AuthContext from "../../../store/auth-context";
import { addRecentMessage } from "../../../store/recentMessagesSlice";
import sendIcon from "../../../assets/send.svg";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { useParams } from "react-router-dom";

const NewMessage = () => {
  const { ID } = useParams();
  const userInfo = useSelector((state) => state.chat.userInfo);
  const { token, socket, _id, firstName, lastName, profilePath } =
    useContext(AuthContext);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const dispatch = useDispatch();

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
    } else if (input.length > 250) {
      setError("Message cannot be longer than 250 characters.");
    } else {
      const message = {
        _id: `${_id}${ID}`,
        text: input,
        fromId: _id,
        toId: ID,
        createdAt: Date.now(),
      };
      try {
        setIsSending(true);
        await axios.post(
          `${process.env.REACT_APP_API_URL}/messages/send-message`,
          message,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        socket.emit("send-message", {
          ...message,
          userInfo: [
            {
              _id: _id,
              firstName: firstName,
              lastName: lastName,
              profilePath: profilePath,
            },
          ],
        });
        dispatch(addMessage(message));
        dispatch(addRecentMessage({ ...message, userInfo: [{_id: ID, ...userInfo}] }));
        setInput("");
        setError(null);
      } catch (error) {
        setError("Something went wrong. Try again.");
      } finally {
        setIsSending(false);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.form} onSubmit={sendMessageHandler}>
        <Input
          className={styles.input}
          onChange={changeHandler}
          placeholder="Enter you message..."
          value={input}
          isError={error}
        />
        <Button disabled={isSending} className={styles.button}>
          <img src={sendIcon} className={styles.icon} alt="Send Icon." />
        </Button>
      </form>
    </div>
  );
};

export default NewMessage;
