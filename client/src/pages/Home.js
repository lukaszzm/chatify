import { Outlet } from 'react-router-dom';
import Welcome from '../components/Login/Welcome';

const Home = () => {
  return (
    <>
      <Outlet />
      <Welcome />
    </>
  );
};

export default Home;
