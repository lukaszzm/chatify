import clsx from "clsx";
import styles from "./Card.module.css";

interface CardProps {
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  isActive,
  className,
}) => {
  return (
    <div
      className={clsx(
        `${styles.wrapper}`,
        `${className}`,
        isActive && `${styles.isActive}`
      )}
    >
      {children}
    </div>
  );
};
