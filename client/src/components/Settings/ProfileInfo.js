import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import styles from "./ProfileInfo.module.css";
import ProfileImage from "../UI/ProfileImage";
import ChangeBox from "./ChangeBox";

const updateFirstNameUrl = `${process.env.REACT_APP_API_URL}/auth/update-first-name`;
const updateLastNameUrl = `${process.env.REACT_APP_API_URL}/auth/update-last-name`;

const ProfileInfo = () => {
  const { profilePath, firstName, lastName } = useContext(AuthContext);

  return (
    <div className={styles.wrapper}>
      <ProfileImage src={profilePath} className={styles["profile-image"]} />
      <ChangeBox initialValue={firstName} value="First name" url={updateFirstNameUrl}/>
      <ChangeBox initialValue={lastName} value="Last name" url={updateLastNameUrl}/>
    </div>
  );
};

export default ProfileInfo;
