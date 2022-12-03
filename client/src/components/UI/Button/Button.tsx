import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "submit" | "reset" | "button";
  outline?: boolean;
  disabled?: boolean;
  maxWidth?: string;
  form?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type,
  outline,
  disabled,
  maxWidth,
  form,
}) => {
  const classes = outline
    ? `${styles.button} ${styles.outline} ${className}`
    : `${styles.button} ${className}`;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classes}
      type={type || "submit"}
      style={{ maxWidth: maxWidth }}
      form={form}
    >
      {children}
    </button>
  );
};
