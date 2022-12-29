import styles from "./Button.module.css";
import clsx from "clsx";

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
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        `${styles.button}`,
        `${className}`,
        outline && `${styles.outline}`
      )}
      type={type || "submit"}
      style={{ maxWidth: maxWidth }}
      form={form}
    >
      {children}
    </button>
  );
};
