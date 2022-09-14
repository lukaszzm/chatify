import styles from './Content.module.css';

const Content = ({ children, position }) => {
    const classes = position === "left" ? `${styles.container} ${styles.left}` : `${styles.container}`;

    return <section className={classes}>
        { children }
    </section>
}

export default Content;