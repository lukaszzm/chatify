import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
      <div className={styles.spinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
  );
};

export default LoadingSpinner;
