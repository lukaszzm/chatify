import styles from "./Icon.module.css";

interface IconProps {
  icon: string;
  alt: string;
  className?: string;
  noColor?: boolean;
}
export const Icon: React.FC<IconProps> = ({
  className,
  icon,
  alt,
  noColor,
}) => {
  const classes = noColor
    ? `${styles["no-color"]} ${styles.icon} ${className}`
    : `${styles.icon} ${className}`;

  return <img className={classes} src={icon} alt={alt} />;
};
