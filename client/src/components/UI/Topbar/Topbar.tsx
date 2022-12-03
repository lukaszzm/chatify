import styles from "./Topbar.module.css";
import { Link } from 'react-router-dom';
import { Icon } from '..';
import backIcon from '../../../assets/icons/back.svg';

interface TopbarProps {
  children: React.ReactNode,
  backTo: string
}

export const Topbar: React.FC<TopbarProps> = ({ children, backTo }) => {

    return (
        <div className={styles.container}>
          <Link className={styles.back} to={backTo}>
            <Icon noColor icon={backIcon} alt="back" />
          </Link>
          {children}
        </div>
    )
}

