import styles from "./LoadingImage.module.css";

const LoadingImage = ({ className }) => {
  return <div className={`${styles["loading-image"]} ${className}`}></div>;
};

export default LoadingImage;
