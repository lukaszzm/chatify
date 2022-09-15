import styles from "./Appearance.module.css";
import Topbar from "../UI/Topbar";
import Switch from "../UI/Switch";

const Appearance = () => {
  return (
    <>
      <Topbar backTo="/settings">
        <h3>Appearance Settings</h3>
      </Topbar>
      <div className={styles.container}>
      <label htmlFor="" className={styles.label}>
        Dark mode
      </label>
      <Switch className={styles.switch} labels/>
      </div>
      
    </>
  );
};

export default Appearance;
