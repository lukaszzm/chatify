import styles from "./SettingsContainer.module.css";

export const SettingsContainer = ({ children }) => {
  return <div className={styles.container}> {children} </div>;
};

