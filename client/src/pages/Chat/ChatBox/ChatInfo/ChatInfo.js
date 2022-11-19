import styles from "./ChatInfo.module.css";
import { useParams } from "react-router-dom";
import { LoadingImage, LoadingText, ProfileImage, Topbar } from "../../../../components/UI";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../../../api";

export const ChatInfo = () => {
  const { ID } = useParams();
  const { data, isLoading, isError } = useQuery(["chat-info", ID], () =>
    getUserInfo(ID)
  );

  return (
    <Topbar backTo="/dashboard/chat">
      {isLoading ? (
        <div className={styles["user"]}>
          <LoadingImage className={styles["loading-image"]} />
          <LoadingText className={styles["loading-text"]} />
        </div>
      ) : isError ? (
        <p>Something went wrong.</p>
      ) : (
        <div className={styles["user"]}>
          <ProfileImage
            className={styles["user-image"]}
            src={data[0].profileImage}
          />
          <h4 className={styles["user-text"]}>
            {`${data[0].firstName} ${data[0].lastName}`}
          </h4>
        </div>
      )}
    </Topbar>
  );
};
