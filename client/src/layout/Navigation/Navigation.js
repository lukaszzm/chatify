import styles from "./Navigation.module.css";
import { useContext } from "react";
import { NavLink, useMatch } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import AuthContext from "../../contexts/auth-context";
import logoIcon from "../../assets/logo.svg";
import chatIcon from "../../assets/icons/chat.svg";
import listIcon from "../../assets/icons/list.svg";
import settingsIcon from "../../assets/icons/settings.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import { useMediaQuery } from "react-responsive";
import ReactDOM from "react-dom";
import { useModal } from "../../hooks/useModal";
import { ProfileImage, Icon, Modal } from "../../components/UI";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../api";

export const Navigation = () => {
  const { logout, _id, setUserInfo, profileImage } =
    useContext(AuthContext);
  const isFirstNested = useMatch("dashboard/:id");
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });
  const {isModalOpen, openModal, closeModal } = useModal();
  useQuery(["auth", _id], () =>
  getUserInfo(_id), { onSuccess: (data) => setUserInfo(data[0]), onError: () => logout()}
);


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
            onClick={openModal}
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
            onClick={openModal}
          >
            <Icon icon={logoutIcon}>Logout</Icon>
          </button>
        </Tooltip>
      </div>
      {isModalOpen &&
        ReactDOM.createPortal(
          <Modal
            isOpen={isModalOpen}
            closeModal={closeModal}
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
