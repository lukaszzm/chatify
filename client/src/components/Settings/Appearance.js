import styles from "./Appearance.module.css";
import Topbar from "../UI/Topbar";
import Switch from "../UI/Switch";
import Label from "../UI/Label";
import ThemeContext from "../../store/theme-context";
import { useContext } from "react";

const Appearance = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <Topbar backTo="/settings">
        <h3>Appearance Settings</h3>
      </Topbar>
      <div className={styles.container}>
      <Label htmlFor="switch">
        Dark mode
      </Label>
      <Switch withLabels onChange={toggleTheme} checked={theme === 'dark'}/>
      </div>
      
    </>
  );
};

export default Appearance;
