import clsx from "clsx";
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
  return (
    <img
      className={clsx(
        `${styles.icon}`,
        `${className}`,
        noColor && `${styles["no-color"]}`
      )}
      src={icon}
      alt={alt}
    />
  );
};
