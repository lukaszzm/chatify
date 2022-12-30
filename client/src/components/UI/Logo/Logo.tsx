import styles from "./Logo.module.css";
import logoIcon from "../../../assets/logo.svg";
import clsx from "clsx";

interface ILogoProps {
  onlyMobile?: boolean;
}

export const Logo: React.FC<ILogoProps> = ({ onlyMobile }) => {
  return (
    <div
      className={clsx(
        `${styles.logo}`,
        onlyMobile && `${styles["only-mobile"]}`
      )}
    >
      <img src={logoIcon} alt="Logo" />
      <h1>Chatify</h1>
    </div>
  );
};
