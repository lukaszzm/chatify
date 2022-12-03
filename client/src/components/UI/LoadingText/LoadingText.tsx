import styles from "./LoadingText.module.css";

interface LoadingTextProps {
  className?: string;
}

export const LoadingText: React.FC<LoadingTextProps> = ({ className }) => {
  return <div className={`${styles["loading-text"]} ${className}`}></div>;
};
