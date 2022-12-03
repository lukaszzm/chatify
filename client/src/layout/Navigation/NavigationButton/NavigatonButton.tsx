import styles from "./NavigationButton.module.css"
import { Tooltip } from "@mui/material";
import { Icon } from "../../../components/UI";

interface NavigationButtonProps {
    title: string,
    icon: string,
    onClick: () => void
    isMobile: boolean
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({title, icon, onClick, isMobile}) => {
  const buttonStyle = isMobile ? "logout-mobile-button" : "logout-desktop-button";
  return (
    <Tooltip title={title} placement="right">
      <button className={styles[`${buttonStyle}`]} onClick={onClick}>
        <Icon icon={icon} alt={title} />
      </button>
    </Tooltip>
  );
};
