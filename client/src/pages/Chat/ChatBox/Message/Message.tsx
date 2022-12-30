import clsx from "clsx";
import formatTime from "../../../../utils/format-time";
import styles from "./Message.module.css";

interface MessageProps {
  isMine: boolean;
  text: string;
  createdAt: string | Date;
}

export const Message: React.FC<MessageProps> = ({
  createdAt,
  isMine,
  text,
}) => {
  const formattedTime = formatTime(createdAt);

  return (
    <div
      data-time={formattedTime}
      className={clsx(
        `${styles.container}`,
        isMine ? `${styles.mine}` : `${styles["not-mine"]}`
      )}
    >
      <p className={styles.text}>{text}</p>
    </div>
  );
};
