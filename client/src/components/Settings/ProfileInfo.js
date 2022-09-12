import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import styles from "./ProfileInfo.module.css";
import ProfileImage from "../UI/ProfileImage";
import Input from "../UI/Input";
import Button from "../UI/Button";
import ChangeBox from "./ChangeBox";

const ProfileInfo = () => {
  const { profilePath, firstName, lastName } = useContext(AuthContext);

  return (
    <div className={styles.wrapper}>
      <ProfileImage src={profilePath} className={styles["profile-image"]} />
      <ChangeBox initialValue={firstName} value="First name" />
      <ChangeBox initialValue={lastName} value="Last name" />
    </div>
  );
};

export default ProfileInfo;
