import { useContext } from "react";
import AuthContext from "../../contexts/auth-context";
import { ChangeBox } from "./ChangeBox";
import { ChangeImage } from "./ChangeImage";
import { Topbar, SettingsContainer } from "../../components/UI";

const API_URL = `${process.env.REACT_APP_API_URL}/auth`;

export const Profile = () => {
  const { profileImage, firstName, lastName } = useContext(AuthContext);

  return (
    <>
      <Topbar backTo="/dashboard/settings">
        <h3>Profile Settings</h3>
      </Topbar>
      <SettingsContainer>
        <ChangeImage defaultImage={profileImage} url={API_URL} />
        <ChangeBox
          initialValue={firstName}
          value="First name"
          url={`${API_URL}/update-first-name`}
        />
        <ChangeBox
          initialValue={lastName}
          value="Last name"
          url={`${API_URL}/update-last-name`}
        />
      </SettingsContainer>
    </>
  );
};