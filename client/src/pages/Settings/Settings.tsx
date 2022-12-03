import { SettingsBar } from "./SettingsBar";
import { Outlet, useMatch } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Content } from "../../components/UI";

export const Settings = () => {
  const url = useMatch("dashboard/settings/:SID");
  const sid = url?.params.SID;
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  if (isMobile && sid) {
    return (
      <Content>
        <Outlet />
      </Content>
    );
  }

  if (isMobile && !sid) {
    return (
      <>
        <SettingsBar />
      </>
    );
  }

  return (
    <>
      <SettingsBar active={sid || ""} />
      <Content>
        <Outlet />
      </Content>
    </>
  );
};
