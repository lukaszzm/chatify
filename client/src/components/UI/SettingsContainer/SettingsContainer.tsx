import styles from "./SettingsContainer.module.css";

interface SettingsContainerProps {
  children: React.ReactNode;
}

export const SettingsContainer: React.FC<SettingsContainerProps> = ({
  children,
}) => {
  return <div className={styles.container}> {children} </div>;
};
