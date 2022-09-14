import React from 'react';
import styles from "./Input.module.css";

const Input = React.forwardRef(({ className, placeholder, onChange, value, isError, id, type }, ref) => {
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
});

export default Input;
