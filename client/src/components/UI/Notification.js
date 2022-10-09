import styles from "./Notification.module.css";

const Notification = ({ children }) => {
    return <p className={styles.notification}> { children } </p>
}


export default Notification;