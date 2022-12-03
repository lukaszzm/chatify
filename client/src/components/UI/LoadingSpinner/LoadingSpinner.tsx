import styles from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  center?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ center }) => {
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
