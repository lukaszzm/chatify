import styles from "./LoadingImage.module.css";

interface LoadingImageProps {
  className?: string;
}

export const LoadingImage: React.FC<LoadingImageProps> = ({ className }) => {
  return <div className={`${styles["loading-image"]} ${className}`}></div>;
};
