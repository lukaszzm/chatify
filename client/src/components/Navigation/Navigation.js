import styles from "./Navigation.module.css";
import { useContext, useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { NavLink, useMatch } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import AuthContext from "../../store/auth-context";
import ProfileImage from "../UI/ProfileImage";
import Icon from "../UI/Icon";
import logoIcon from "../../assets/logo.svg";
import chatIcon from "../../assets/icons/chat.svg";
import listIcon from "../../assets/icons/list.svg";
import settingsIcon from "../../assets/icons/settings.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import { useMediaQuery } from "react-responsive";
import Modal from "../UI/Modal";
import ReactDOM from "react-dom";

const Navigation = () => {
  const { logout, _id, setUserInfo, token, profileImage } =
    useContext(AuthContext);
  const isFirstNested = useMatch("dashboard/:id");
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userData, error] = useAxios({
    url: `/auth/user-by-id/${_id}`,
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    if (userData) {
      setUserInfo(userData[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  // const logoutHandler = () => {
  //   logout();
  // };

  return (
    <nav
      className={styles["navigation-panel"]}
      style={{ display: isMobile && !isFirstNested ? "none" : "flex" }}
    >
      <img src={logoIcon} className={styles.logo} alt="logo" />
      <div className={styles.links}>
        <Tooltip title="chat" placement="right">
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to="chat"
          >
            <Icon icon={chatIcon}>Chat</Icon>
          </NavLink>
        </Tooltip>
        <Tooltip title="notes" placement="right">
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to="notes"
          >
            <Icon icon={listIcon}>Notes</Icon>
          </NavLink>
        </Tooltip>
        <Tooltip title="settings" placement="right">
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to="settings"
          >
            <Icon icon={settingsIcon}>Settings</Icon>
          </NavLink>
        </Tooltip>
        <Tooltip title="logout" placement="right">
          <button
            className={styles["logout-mobile-button"]}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <Icon icon={logoutIcon}>Logout</Icon>
          </button>
        </Tooltip>
      </div>
      <div className={styles.changers}>
        {profileImage && (
          <ProfileImage
            className={styles["profile-image"]}
            src={profileImage}
            alt=""
          />
        )}
        <Tooltip title="logout" placement="right">
          <button
            className={styles["logout-desktop-button"]}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <Icon icon={logoutIcon}>Logout</Icon>
          </button>
        </Tooltip>
      </div>
      {isModalOpen &&
        ReactDOM.createPortal(
          <Modal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            title="log out"
            onConfirm={logout}
          >
            <p>Are you sure are you want to log out</p>
          </Modal>,
          document.getElementById("modals")
        )}
    </nav>
  );
};

export default Navigation;
