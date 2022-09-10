import styles from "./ChatInfo.module.css";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../../../hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../../store/chatSlice";
import AuthContext from "../../../store/auth-context";
import { Link } from "react-router-dom";
import backIcon from "../../../assets/back.svg";
import LoadingImage from "../../UI/LoadingImage";
import LoadingText from "../../UI/LoadingText";
import ProfileImage from "../../UI/ProfileImage";
import Icon from "../../UI/Icon";

const ChatInfo = () => {
  const { token } = useContext(AuthContext);
  const { ID } = useParams();
  const [userData, error, loading] = useAxios(
    {
      url: `/auth/user-by-id/${ID}`,
      headers: { Authorization: `Bearer ${token}` },
    },
    true,
    ID
  );
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.chat.userInfo);

  useEffect(() => {
    if (userData) {
      const { firstName, lastName, profilePath } = userData[0];
      dispatch(setUserInfo({ firstName, lastName, profilePath }));
    }
  }, [userData, dispatch]);

  if (error) {
    return <p>Can't load user info.</p>;
  }

  return (
    <div className={styles["top-bar"]}>
      {loading ? (
        <>
          <div className={styles["user"]}>
            <LoadingImage className={styles["loading-image"]} />
            <LoadingText className={styles["loading-text"]} />
          </div>
        </>
      ) : (
        <>
          <Link className={styles.back} to="/dashboard">
            <Icon icon={backIcon} />
          </Link>
          <div className={styles["user"]}>
            <ProfileImage
              className={styles["user-image"]}
              src={userInfo.profilePath}
            />
            <h4 className={styles["user-text"]}>
              {`${userInfo.firstName} ${userInfo.lastName}`}
            </h4>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatInfo;
