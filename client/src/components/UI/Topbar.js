import styles from "./Topbar.module.css";
import { Link } from 'react-router-dom';
import Icon from './Icon';
import backIcon from '../../assets/icons/back.svg';

const Topbar = ({ children, backTo }) => {

    return (
        <div className={styles.container}>
          <Link className={styles.back} to={backTo}>
            <Icon icon={backIcon} />
          </Link>
          {children}
        </div>
    )
}

export default Topbar;