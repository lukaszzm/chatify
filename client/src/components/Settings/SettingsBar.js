import styles from "./SettingsBar.module.css";
import { Link } from "react-router-dom";
import Card from "../UI/Card";
import Icon from "../UI/Icon";
import appearanceIcon from "../../assets/appearance-settings.svg";
import profileIcon from "../../assets/profile-settings.svg";
import passwordIcon from "../../assets/password-settings.svg";
import Sidebar from "../UI/Sidebar";

const SettingsBar = ({active}) => {

  return (
    <Sidebar>
      <h1>Settings</h1>
      <div className={styles.container}>
        <Link to="/settings/profile">
          <Card className={styles.card} isActive={active === 'profile'}>
          <Icon className={styles.icon} icon={profileIcon} />
            <h4>Profile</h4>
          </Card>
        </Link>
        <Link to="/settings/password">
          <Card className={styles.card} isActive={active === 'password'}>
          <Icon className={styles.icon} icon={passwordIcon} />
            <h4>Password</h4>
          </Card>
        </Link>
        <Link to="/settings/appearance">
          <Card className={styles.card} isActive={active === 'appearance'}>
            <Icon className={styles.icon} icon={appearanceIcon} />
            <h4>Appearance</h4>
          </Card>
        </Link>
      </div>
    </Sidebar>
  );
};

export default SettingsBar;
