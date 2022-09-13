import styles from "./Navigation.module.css";
import { useContext, useEffect } from "react";
import { useAxios } from "../../../hooks/useAxios";
import { NavLink } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import AuthContext from "../../../store/auth-context";
import ProfileImage from "../../UI/ProfileImage";
import Icon from "../../UI/Icon";
import logoIcon from "../../../assets/logo.svg";
import chatIcon from "../../../assets/chat.svg";
import peopleIcon from "../../../assets/people.svg";
import locationIcon from "../../../assets/location.svg";
import settingsIcon from "../../../assets/settings.svg";
import logoutIcon from "../../../assets/logout.svg";

const Navigation = () => {
  const { logout, _id, setUserInfo, token, profilePath } =
    useContext(AuthContext);
  const [userData, error] = useAxios(
    {
      url: `/auth/user-by-id/${_id}`,
      headers: { Authorization: `Bearer ${token}` },
    },
    true
  );

  useEffect(() => {
    if (error) logout();

    if (userData) {
      setUserInfo(userData[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logoutHandler = () => {
    logout();
  };

  return (
    <nav className={styles["navigation-panel"]}>
      <img src={logoIcon} className={styles.logo} alt="logo" />
      <div className={styles.links}>
        <Tooltip title="dashboard" placement="right">
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to="/dashboard"
          >
            <Icon icon={chatIcon}>Chat</Icon>
          </NavLink>
        </Tooltip>
        <Tooltip title="friends" placement="right">
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to="/friends"
          >
            <Icon icon={peopleIcon}>People</Icon>
          </NavLink>
        </Tooltip>
        <Tooltip title="groups" placement="right">
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to="/groups"
          >
            <Icon icon={locationIcon}>Location</Icon>
          </NavLink>
        </Tooltip>
        <Tooltip title="settings" placement="right">
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to="/settings"
          >
            <Icon icon={settingsIcon}>Settings</Icon>
          </NavLink>
        </Tooltip>
        <Tooltip title="logout" placement="right">
          <button
            className={styles["logout-mobile-button"]}
            onClick={logoutHandler}
          >
            <Icon icon={logoutIcon}>Logout</Icon>
          </button>
        </Tooltip>
      </div>
      <div className={styles.changers}>
        {profilePath && (
          <ProfileImage
            className={styles["profile-image"]}
            src={profilePath}
            alt=""
          />
        )}
        <Tooltip title="logout" placement="right">
          <button
            className={styles["logout-desktop-button"]}
            onClick={logoutHandler}
          >
            <Icon icon={logoutIcon}>Logout</Icon>
          </button>
        </Tooltip>
      </div>
    </nav>
  );
};

export default Navigation;
