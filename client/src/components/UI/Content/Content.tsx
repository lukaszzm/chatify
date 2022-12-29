import clsx from "clsx";
import styles from "./Content.module.css";

interface IContentProps {
  children: React.ReactNode;
  onLeft?: boolean;
}
export const Content: React.FC<IContentProps> = ({ children, onLeft }) => {
  return (
    <section
      className={clsx(`${styles.container}`, onLeft && `${styles.left}`)}
    >
      {children}
    </section>
  );
};
