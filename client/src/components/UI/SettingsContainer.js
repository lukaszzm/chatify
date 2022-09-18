import styles from "./SettingsContainer.module.css";

const SettingsContainer = ({ children }) => {
  return <div className={styles.container}> {children} </div>;
};

export default SettingsContainer;