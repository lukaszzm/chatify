import styles from "./RecentMessage.module.css";
import { Link } from "react-router-dom";
import formatTime from "../../../../utils/format-time";
import { ProfileImage, Card } from "../../../../components/UI";

interface RecentMessageProps {
  createdAt: string | Date;
  isActive: boolean;
  message: string;
  id: string;
  profileImage: string;
  firstName: string;
  lastName: string;
  isMine: boolean;
}

export const RecentMessage: React.FC<RecentMessageProps> = ({
  createdAt,
  isActive,
  message,
  id,
  profileImage,
  firstName,
  lastName,
  isMine,
}) => {
  const formattedTime =
    typeof createdAt === "string"
      ? formatTime(createdAt)
      : formatTime(createdAt.toString());

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
