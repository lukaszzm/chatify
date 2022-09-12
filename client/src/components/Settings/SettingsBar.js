import styles from "./SettingsBar.module.css";
import { Link, useMatch } from "react-router-dom";
import Card from "../UI/Card";
import Icon from "../UI/Icon";
import appearanceIcon from "../../assets/appearance-settings.svg";
import profileIcon from "../../assets/profile-settings.svg";
import passwordIcon from "../../assets/password-settings.svg";

const SettingsBar = () => {
  const url = useMatch("/settings/:SID");

  return (
    <div className={styles.wrapper}>
      <h1>Settings</h1>
      <div className={styles.container}>
        <Link to="/settings/profile">
          <Card className={styles.card} isActive={url?.params.SID === 'profile'}>
          <Icon className={styles.icon} icon={profileIcon} />
            <h4>Profile</h4>
          </Card>
        </Link>
        <Link to="/settings/password">
          <Card className={styles.card} isActive={url?.params.SID === 'password'}>
          <Icon className={styles.icon} icon={passwordIcon} />
            <h4>Password</h4>
          </Card>
        </Link>
        <Link to="/settings/appearance">
          <Card className={styles.card} isActive={url?.params.SID === 'appearance'}>
            <Icon className={styles.icon} icon={appearanceIcon} />
            <h4>Appearance</h4>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default SettingsBar;
