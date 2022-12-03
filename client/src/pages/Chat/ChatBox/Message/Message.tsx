import formatTime from "../../../../utils/format-time";
import styles from "./Message.module.css";

interface MessageProps {
  isMine: boolean;
  text: string;
  createdAt: string | Date;
}

// TODO: fix displaying time
export const Message: React.FC<MessageProps> = ({
  createdAt,
  isMine,
  text,
}) => {
  const classes = isMine
    ? `${styles.container} ${styles.mine}`
    : `${styles.container} ${styles["not-mine"]}`;

  const formattedTime = formatTime(createdAt);

  return (
    <div data-time={formattedTime} className={classes}>
      <p className={styles.text}>{text}</p>
    </div>
  );
};
