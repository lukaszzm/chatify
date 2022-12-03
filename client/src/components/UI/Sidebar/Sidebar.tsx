import styles from './Sidebar.module.css';

interface SidebarProps {
    children: React.ReactNode;
}


export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    return <aside className={styles.sidebar}>
        { children }
    </aside>
}
