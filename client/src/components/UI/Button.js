import styles from "./Button.module.css";

export const Button = ({
  className,
  children,
  onClick,
  type,
  outline,
  disabled,
  maxWidth,
  form
}) => {
  const classes = outline
    ? `${styles.button} ${styles.outline} ${className}`
    : `${styles.button} ${className}`;
  const buttonType = type ? `${type}` : "submit";

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classes}
      type={buttonType}
      style={{ maxWidth: maxWidth }}
      form={form}
    >
      {children}
    </button>
  );
};

