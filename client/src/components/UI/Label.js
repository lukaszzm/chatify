import styles from "./Label.module.css";

export const Label = ({ children, htmlFor }) => {
    return <label htmlFor={htmlFor} className={styles.label}> {children} </label>
}
