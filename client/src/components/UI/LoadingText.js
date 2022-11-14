import styles from "./LoadingText.module.css";

export const LoadingText = ({ className }) => {
  return <div className={`${styles["loading-text"]} ${className}`}></div>;
};

