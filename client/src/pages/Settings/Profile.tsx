import { useContext } from "react";
import AuthContext from "../../contexts/auth-context";
import { ChangeBox } from "./ChangeBox";
import { ChangeImage } from "./ChangeImage";
import { Topbar, SettingsContainer } from "../../components/UI";

const API_URL = `${process.env.REACT_APP_API_URL}/auth`;

export const Profile = () => {
  const { info } = useContext(AuthContext);

  return (
    <>
      <Topbar backTo="/dashboard/settings">
        <h3>Profile Settings</h3>
      </Topbar>
      <SettingsContainer>
        <ChangeImage defaultImage={info!.profileImage} url={API_URL} />
        <ChangeBox
          initialValue={info!.firstName}
          value="First name"
          url={`${API_URL}/update-first-name`}
        />
        <ChangeBox
          initialValue={info!.lastName}
          value="Last name"
          url={`${API_URL}/update-last-name`}
        />
      </SettingsContainer>
    </>
  );
};
