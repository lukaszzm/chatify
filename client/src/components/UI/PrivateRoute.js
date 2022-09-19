import { useContext} from 'react';
import { Navigate, Route } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

const PrivateRoute = ({ path, element, children }) => {
    const { isLoggedIn } = useContext(AuthContext);

    return <Route path={path} element={isLoggedIn ? element : <Navigate to="/" />}> {children} </Route>
}

export default PrivateRoute;