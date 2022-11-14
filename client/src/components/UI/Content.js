import styles from "./Content.module.css";

export const Content = ({ children, position }) => {
  const classes =
    position === "left"
      ? `${styles.container} ${styles.left}`
      : `${styles.container}`;

  return <section className={classes}>{children}</section>;
};
