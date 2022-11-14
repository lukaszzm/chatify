import styles from "./Topbar.module.css";
import { Link } from 'react-router-dom';
import { Icon } from '../UI';
import backIcon from '../../assets/icons/back.svg';

export const Topbar = ({ children, backTo }) => {

    return (
        <div className={styles.container}>
          <Link className={styles.back} to={backTo}>
            <Icon noColor icon={backIcon} />
          </Link>
          {children}
        </div>
    )
}

