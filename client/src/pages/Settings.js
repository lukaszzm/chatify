import SettingsBar from "../components/Settings/SettingsBar";
import { Outlet, useMatch } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Content } from "../components/UI";

const Settings = () => {
  const url = useMatch("dashboard/settings/:SID");
  const sid = url?.params.SID;
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  let content = "";

  if (isMobile) {
    if (sid) {
      content = (
        <Content>
            <Outlet />
        </Content>
      );
    } else {
      content = (
        <>
          <SettingsBar active={sid || ""} />
        </>
      );
    }
  } else {
    content = (
      <>
        <SettingsBar active={sid || ""} />
        <Content>
            <Outlet />
        </Content>
      </>
    );
  }

  return content;
};

export default Settings;
