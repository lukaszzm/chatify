import styles from "./Message.module.css";
import formatTime from "../../../../utils/format-time";

export const Message = ({createdAt, isMine, text}) => {
  
  const formattedTime = formatTime(createdAt);
  
  const classes = isMine
    ? `${styles.container} ${styles.mine}`
    : `${styles.container} ${styles["not-mine"]}`;

  return (
    <div time={formattedTime} className={classes}>
        <p className={styles.text}>{text}</p>
    </div>
  );
};