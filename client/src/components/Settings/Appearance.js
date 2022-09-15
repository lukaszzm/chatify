import styles from "./Appearance.module.css";
import Topbar from "../UI/Topbar";
import Switch from "../UI/Switch";
import Label from "../UI/Label";

const Appearance = () => {
  return (
    <>
      <Topbar backTo="/settings">
        <h3>Appearance Settings</h3>
      </Topbar>
      <Label htmlFor="switch">
        Dark mode
      </Label>
      <Switch withLabels/>
    </>
  );
};

export default Appearance;
