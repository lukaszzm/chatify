import styles from "./ChatInfo.module.css";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../../../hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../../store/chatSlice";
import AuthContext from "../../../store/auth-context";
import LoadingImage from "../../UI/LoadingImage";
import LoadingText from "../../UI/LoadingText";
import ProfileImage from "../../UI/ProfileImage";
import Topbar from "../../UI/Topbar";

const ChatInfo = () => {
  const { token } = useContext(AuthContext);
  const { ID } = useParams();
  const [userData, error, loading] = useAxios(
    {
      url: `/auth/user-by-id/${ID}`,
      headers: { Authorization: `Bearer ${token}` },
    },
    ID
  );
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.chat.userInfo);

  useEffect(() => {
    if (userData) {
      const { firstName, lastName, profileImage } = userData[0];
      dispatch(setUserInfo({ firstName, lastName, profileImage }));
    }
  }, [userData, dispatch]);

  if (error) {
    return <p>Can't load user info.</p>;
  }

  return (
    <Topbar backTo="/dashboard/chat">
      {loading ? (
          <div className={styles["user"]}>
            <LoadingImage className={styles["loading-image"]} />
            <LoadingText className={styles["loading-text"]} />
          </div>
      ) : (
          <div className={styles["user"]}>
            <ProfileImage
              className={styles["user-image"]}
              src={userInfo.profileImage}
            />
            <h4 className={styles["user-text"]}>
              {`${userInfo.firstName} ${userInfo.lastName}`}
            </h4>
          </div>
      )}
    </Topbar>
  );
};

export default ChatInfo;
