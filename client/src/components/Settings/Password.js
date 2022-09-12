import styles from "./Password.module.css";
import Topbar from "../UI/Topbar";

const Password = () => {
    return <Topbar backTo="/settings"><h1 className={styles.header}>Password Settings</h1></Topbar>
}

export default Password;
