import styles from "./Profile.module.css";
import Topbar from "../UI/Topbar";

const Profile = () => {
    return <Topbar backTo="/settings"><h1 className={styles.header}>Profile Settings</h1></Topbar>
}

export default Profile;
