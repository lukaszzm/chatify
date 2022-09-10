import styles from './Button.module.css';

const Button = ({className, children, onClick, type, outline, disabled}) => {

    const classes = outline ? `${styles.button} ${styles.outline} ${className}` : `${styles.button} ${className}`;
    const buttonType = type ? `${type}` : 'submit';

    return (
        <button disabled={disabled} onClick={onClick} className={classes} type={buttonType}>
            {children}
        </button>
    )
}

export default Button;