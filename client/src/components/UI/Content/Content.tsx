import styles from "./Content.module.css";

interface IContentProps {
  children: React.ReactNode;
  position?: string;
}
export const Content: React.FC<IContentProps> = ({ children, position }) => {
  const classes =
    position === "left"
      ? `${styles.container} ${styles.left}`
      : `${styles.container}`;

  return <section className={classes}>{children}</section>;
};
