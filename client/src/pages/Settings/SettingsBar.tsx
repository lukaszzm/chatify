import { Link } from "react-router-dom";
import appearanceIcon from "../../assets/icons/appearance.svg";
import profileIcon from "../../assets/icons/profile.svg";
import passwordIcon from "../../assets/icons/password.svg";
import { Card, Icon, Sidebar, Container } from "../../components/UI";

interface SettingsBarProps {
  active?: string,
}

export const SettingsBar: React.FC<SettingsBarProps> = ({active}) => {

  return (
    <Sidebar>
      <h1>Settings</h1>
      <Container>
        <Link to="profile">
          <Card isActive={active === 'profile'}>
          <Icon noColor icon={profileIcon} alt="profile" />
            <h4>Profile</h4>
          </Card>
        </Link>
        <Link to="password">
          <Card isActive={active === 'password'}>
          <Icon noColor icon={passwordIcon} alt="password" />
            <h4>Password</h4>
          </Card>
        </Link>
        <Link to="appearance">
          <Card isActive={active === 'appearance'}>
            <Icon noColor icon={appearanceIcon} alt="appearance" />
            <h4>Appearance</h4>
          </Card>
        </Link>
      </Container>
    </Sidebar>
  );
};
