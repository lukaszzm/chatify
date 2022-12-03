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
  const classes = isActive
    ? `${styles.wrapper} ${className} ${styles.active}`
    : `${styles.wrapper} ${className}`;

  return <div className={classes}>{children}</div>;
};
