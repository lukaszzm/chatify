import { Outlet } from 'react-router-dom';
import { Welcome } from './Welcome';

export const Home = () => {
  return (
    <>
      <Outlet />
      <Welcome />
    </>
  );
};
