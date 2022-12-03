import styles from "./Alert.module.css";

interface AlertProps {
  error?: boolean;
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ children, error }) => {
  const classes = error
    ? `${styles.alert} ${styles.error}`
    : `${styles.alert} ${styles.success}`;

  return (
    <div className={classes}>
      <p>{children}</p>
    </div>
  );
};
