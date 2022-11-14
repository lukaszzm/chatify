import styles from "./LoadingSpinner.module.css";

export const LoadingSpinner = ({ center }) => {
  const classes = center
    ? `${styles.spinner} ${styles.centered}`
    : `${styles.spinner}`;

  return (
    <div className={classes}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

