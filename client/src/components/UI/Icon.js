import styles from "./Icon.module.css";

const Icon = ({ className, icon, children, noColor }) => {
  const classes = noColor
    ? `${styles["no-color"]} ${styles.icon} ${className}`
    : `${styles.icon} ${className}`;

  return <img className={classes} src={icon} alt={children} />;
};

export default Icon;
