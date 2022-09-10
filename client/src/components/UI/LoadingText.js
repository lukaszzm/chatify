import styles from "./LoadingText.module.css";

const LoadingText = ({ className }) => {
  return <div className={`${styles["loading-text"]} ${className}`}></div>;
};

export default LoadingText;
