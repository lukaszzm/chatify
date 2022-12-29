import { ChangeBox } from "./ChangeBox";
import { ChangeImage } from "./ChangeImage";
import { Topbar, SettingsContainer } from "../../components/UI";
import { useAuth } from "../../hooks/useAuth";

export const Profile = () => {
  const { authData } = useAuth();
  return (
    <>
      <Topbar backTo="/dashboard/settings">
        <h3>Profile Settings</h3>
      </Topbar>
      <SettingsContainer>
        <ChangeImage defaultImage={authData!.profileImage} />
        <ChangeBox initialValue={authData!.firstName} value="First name" />
        <ChangeBox initialValue={authData!.lastName} value="Last name" />
      </SettingsContainer>
    </>
  );
};
