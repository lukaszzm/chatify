import React from "react";
import styles from "./Input.module.css";
import clsx from "clsx";

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
    return (
      <input
        id={id}
        type={type || "text"}
        placeholder={placeholder}
        onChange={onChange}
        className={clsx(
          `${styles.input}`,
          `${className}`,
          isError && `${styles.error}`
        )}
        value={value}
        ref={ref}
      />
    );
  }
);

Input.displayName = "Input";
