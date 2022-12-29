import clsx from "clsx";
import styles from "./Alert.module.css";

interface AlertProps {
  error?: boolean;
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ children, error }) => {
  return (
    <div
      className={clsx(
        `${styles.alert}`,
        error ? `${styles.error}` : `${styles.success}`
      )}
    >
      <p>{children}</p>
    </div>
  );
};
