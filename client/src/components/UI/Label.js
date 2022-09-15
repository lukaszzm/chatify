import styles from "./Label.module.css";

const Label = ({ children, htmlFor }) => {
    return <label htmlFor={htmlFor} className={styles.label}> {children} </label>
}

export default Label;