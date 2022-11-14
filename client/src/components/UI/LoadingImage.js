import styles from "./LoadingImage.module.css";

export const LoadingImage = ({ className }) => {
  return <div className={`${styles["loading-image"]} ${className}`}></div>;
};

