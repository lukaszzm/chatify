import styles from "./Profile.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Topbar from "../UI/Topbar";
import ChangeBox from "./ChangeBox";
import ChangeImage from "./ChangeImage";

const API_URL = `${process.env.REACT_APP_API_URL}/auth`;

const Profile = () => {
  const { profileImage, firstName, lastName } = useContext(AuthContext);

  return (
    <>
      <Topbar backTo="/settings">
        <h3>Profile Settings</h3>
      </Topbar>
      <div className={styles.container}>
        <ChangeImage defaultImage={profileImage} url={API_URL} />
        <ChangeBox
          initialValue={firstName}
          value="First name"
          url={`${API_URL}/update-first-name`}
        />
        <ChangeBox
          initialValue={lastName}
          value="Last name"
          url={`${API_URL}/update-last-name`}
        />
      </div>
    </>
  );
};

export default Profile;
