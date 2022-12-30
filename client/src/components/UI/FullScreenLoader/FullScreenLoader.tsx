import { LoadingSpinner } from "../LoadingSpinner";
import styles from "./FullScreenLoader.module.css";

export const FullScreenLoader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <LoadingSpinner />
      </div>
    </div>
  );
};
