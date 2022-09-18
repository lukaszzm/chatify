import Topbar from "../UI/Topbar";
import Switch from "../UI/Switch";
import Label from "../UI/Label";
import ThemeContext from "../../store/theme-context";
import { useContext } from "react";
import SettingsContainer from "../UI/SettingsContainer";

const Appearance = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <Topbar backTo="/settings">
        <h3>Appearance Settings</h3>
      </Topbar>
      <SettingsContainer>
      <Label htmlFor="switch">
        Dark mode
      </Label>
      <Switch withLabels onChange={toggleTheme} checked={theme === 'dark'}/>
      </SettingsContainer>
      
    </>
  );
};

export default Appearance;
