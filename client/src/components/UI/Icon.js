import styles from "./Icon.module.css";

const Icon = ({ className, icon, children }) => {
  const classes = `${styles.icon} ${className}`;

  return <img className={classes} src={icon} alt={children} />;
};

export default Icon;
