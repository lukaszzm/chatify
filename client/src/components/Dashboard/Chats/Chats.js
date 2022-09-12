import styles from './Chats.module.css';
import RecentMessages from './RecentMessages';
import SearchBar from './SearchBar';

const Chats = () => {

    return (
        <section className={styles.wrapper}>
            <h1>Chats</h1>
            <SearchBar/>
            <h4>Recent</h4>
            <RecentMessages />
        </section>
    )
}

export default Chats;