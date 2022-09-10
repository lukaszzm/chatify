import styles from './Chats.module.css';
import RecentMessages from './RecentMessages';
import SearchBar from './SearchBar';

const Chats = () => {

    return (
        <section className={styles.wrapper}>
            <h1 className={styles.title}>Chats</h1>
            <SearchBar/>
            <h4 className={styles.subtitle}>Recent</h4>
            <RecentMessages />
        </section>
    )
}

export default Chats;