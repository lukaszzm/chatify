import styles from "./Appearance.module.css";
import Topbar from "../UI/Topbar";

const Appearance = () => {
    return <Topbar backTo="/settings"><h1 className={styles.header}>Appearance Settings</h1></Topbar>
}

export default Appearance;
