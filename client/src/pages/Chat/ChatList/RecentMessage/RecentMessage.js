import styles from "./RecentMessage.module.css";
import { Link } from "react-router-dom";
import formatTime from "../../../../utils/format-time";
import { ProfileImage, Card } from "../../../../components/UI";

export const RecentMessage = ({
  createdAt,
  isActive,
  message,
  id,
  profileImage,
  firstName,
  lastName,
  isMine,
}) => {
  let formattedTime = formatTime(createdAt);

  const formattedMessage =
    message.length > 14 ? message.substring(0, 13) + ".." : message;

  return (
    <Link to={id}>
      <Card isActive={isActive} className={styles.wrapper}>
        <div className={styles["inner-wrapper"]}>
          <ProfileImage
            className={styles["profile-image"]}
            src={profileImage}
          />
          <div className={styles["text-wrapper"]}>
            <h5 className={styles.name}>
              {firstName} {lastName}
            </h5>
            <p className={styles.message}>
              {isMine && <span className={styles.span}>You: </span>}{" "}
              {formattedMessage}
            </p>
          </div>
        </div>
        <div className={styles["timer-wrapper"]}>
          <p className={styles.timer}>{formattedTime}</p>
        </div>
      </Card>
    </Link>
  );
};