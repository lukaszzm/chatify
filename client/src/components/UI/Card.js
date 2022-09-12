import styles from "./Card.module.css";

const Card = ({ children, isActive, className }) => {
  const classes = isActive
    ? `${styles.wrapper} ${className} ${styles.active}`
    : `${styles.wrapper} ${className}`;

  return <div className={classes}>{children}</div>;
};

export default Card;
