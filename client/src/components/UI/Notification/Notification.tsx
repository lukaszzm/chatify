import styles from "./Notification.module.css";

interface NotificationProps {
    children: React.ReactNode
}

export const Notification: React.FC<NotificationProps> = ({ children }) => {
    return <p className={styles.notification}> { children } </p>
}


