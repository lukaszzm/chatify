import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthContext from "./store/auth-context";

import Chat from "./components/Dashboard/Chat/Chat";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Settings from "./components/Settings/Settings";

import Form from "./components/Login/Form";
import UnderConstruction from "./pages/UnderConstruction";

const App = () => {
  const auth = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="dashboard"
        element={auth.isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />}
      >
      <Route path=":ID" element={<Chat />} />
      </Route>
      <Route
        path="friends"
        element={
          auth.isLoggedIn ? <UnderConstruction /> : <Navigate to="/" replace />
        }
      />
      <Route
        path="groups"
        element={
          auth.isLoggedIn ? <UnderConstruction /> : <Navigate to="/" replace />
        }
      />
      <Route
        path="settings"
        element={
          auth.isLoggedIn ? <Settings /> : <Navigate to="/" replace />
        }
      >
        <Route path="profile" element={null} />
        <Route path="password" element={null} />
        <Route path="appearance" element={null} />
      </Route>
      <Route
        path="/"
        element={
          auth.isLoggedIn ? <Navigate to="dashboard" replace /> : <Home />
        }
      >
        <Route path="register" element={<Form />} />
        <Route path="" element={<Form isLogin />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
