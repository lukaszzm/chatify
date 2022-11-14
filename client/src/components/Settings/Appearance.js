import ThemeContext from "../../store/theme-context";
import { useContext } from "react";
import { Topbar, Switch, Label, SettingsContainer } from "../UI";

const Appearance = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <Topbar backTo="/dashboard/settings">
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
