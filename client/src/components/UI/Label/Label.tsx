import styles from "./Label.module.css";

interface LabelProps {
  children: React.ReactNode;
  htmlFor: string;
}

export const Label: React.FC<LabelProps> = ({ children, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className={styles.label}>
      {children}
    </label>
  );
};
