import styles from "./Profile.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Topbar from "../UI/Topbar";
import ChangeBox from "./ChangeBox";
import ProfileImage from "../UI/ProfileImage";

const updateFirstNameUrl = `${process.env.REACT_APP_API_URL}/auth/update-first-name`;
const updateLastNameUrl = `${process.env.REACT_APP_API_URL}/auth/update-last-name`;

const Profile = () => {
  const { profilePath, firstName, lastName } = useContext(AuthContext);

  return (
    <>
      <Topbar backTo="/settings">
        <h3>Profile Settings</h3>
      </Topbar>
      <div className={styles.container}>
        <ProfileImage src={profilePath} className={styles["profile-image"]} />
        <ChangeBox
          initialValue={firstName}
          value="First name"
          url={updateFirstNameUrl}
        />
        <ChangeBox
          initialValue={lastName}
          value="Last name"
          url={updateLastNameUrl}
        />
      </div>
    </>
  );
};

export default Profile;
