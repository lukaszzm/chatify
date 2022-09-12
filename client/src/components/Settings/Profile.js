import styles from "./Profile.module.css";
import Topbar from "../UI/Topbar";
import ProfileInfo from "./ProfileInfo";

const Profile = () => {
  return (
    <>
      <Topbar backTo="/settings">
        <h3>Profile Settings</h3>
      </Topbar>
      <ProfileInfo />
    </>
  );
};

export default Profile;
