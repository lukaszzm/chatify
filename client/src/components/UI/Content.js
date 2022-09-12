import styles from './Content.module.css';

const Content = ({ children }) => {
    return <section className={styles.container}>
        { children }
    </section>
}

export default Content;