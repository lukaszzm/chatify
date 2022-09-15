import styles from "./Alert.module.css";

const Alert = ({ children, error }) => {
  const classes = error
    ? `${styles.alert} ${styles.error}`
    : `${styles.alert} ${styles.success}`;

  return (
    <div className={classes}>
      <p>{children}</p>
    </div>
  );
};

export default Alert;
