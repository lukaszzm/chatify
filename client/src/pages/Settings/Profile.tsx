import { useContext } from "react";
import AuthContext from "../../contexts/auth-context";
import { ChangeBox } from "./ChangeBox";
import { ChangeImage } from "./ChangeImage";
import { Topbar, SettingsContainer } from "../../components/UI";

export const Profile = () => {
  const { info } = useContext(AuthContext);

  return (
    <>
      <Topbar backTo="/dashboard/settings">
        <h3>Profile Settings</h3>
      </Topbar>
      <SettingsContainer>
        <ChangeImage defaultImage={info!.profileImage} />
        <ChangeBox initialValue={info!.firstName} value="First name" />
        <ChangeBox initialValue={info!.lastName} value="Last name" />
      </SettingsContainer>
    </>
  );
};
