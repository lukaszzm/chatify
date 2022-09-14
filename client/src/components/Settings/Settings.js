import styles from "./Settings.module.css";
import Navigation from "../Dashboard/Navigation/Navigation";
import SettingsBar from "./SettingsBar";
import { useMatch } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Profile from "./Profile";
import Password from "./Password";
import Appearance from "./Appearance";
import Content from "../UI/Content";

const Settings = () => {
  const url = useMatch("/settings/:SID");
  const sid = url?.params.SID;
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  let context = "";
  switch (sid) {
    case "profile":
      context = <Profile />;
      break;
    case "password":
      context = <Password />;
      break;
    case "appearance":
      context = <Appearance />;
      break;
    default:
      context = " ";
      break;
  }

  let content = "";

  if (isMobile) {
    if (sid) {
      content = <Content position="left">{context}</Content>;
    } else {
      content = (
        <>
          <Navigation />
          <SettingsBar active={sid || ""} />
        </>
      );
    }
  } else {
    content = (
      <>
        <Navigation />
        <SettingsBar active={sid || ""} />
        <Content position="left">{context}</Content>
      </>
    );
  }

  return content;
};

export default Settings;
