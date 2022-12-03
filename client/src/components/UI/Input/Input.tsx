import React from "react";
import styles from "./Input.module.css";

interface InputProps {
  className?: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  isError?: boolean;
  id?: string;
  type?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder, onChange, value, isError, id, type }, ref) => {
    const classes = isError
      ? `${styles.input} ${styles.error} ${className}`
      : `${styles.input} ${className}`;

    return (
      <input
        id={id}
        type={type || "text"}
        placeholder={placeholder}
        onChange={onChange}
        className={classes}
        value={value}
        ref={ref}
      />
    );
  }
);

Input.displayName = "Input";
