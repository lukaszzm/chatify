import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthContext from "./store/auth-context";

import Chat from "./components/Dashboard/Chat/Chat";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";

import Form from "./components/Login/Form";
import Profile from "./components/Settings/Profile";
import Password from "./components/Settings/Password";
import Appearance from "./components/Settings/Appearance";
import Layout from "./pages/Layout";
import Notes from "./pages/Notes";
import NoteInfo from "./components/Notes/NoteInfo";

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={isLoggedIn ? <Layout /> : <Navigate to="/" />}
      >
        <Route path="chat" element={<Dashboard />}>
          <Route path=":ID" element={<Chat/>} />
        </Route>
        <Route path="notes" element={<Notes />}>
          <Route path=":ID" element={<NoteInfo/>}/>
        </Route>
        <Route
          path="settings"
          element={<Settings />}
        >
          <Route path="profile" element={<Profile />} />
          <Route path="password" element={<Password />} />
          <Route path="appearance" element={<Appearance />} />
        </Route>
      </Route>
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="dashboard/chat" /> : <Home />}
      >
        <Route path="register" element={<Form />} />
        <Route path="" element={<Form isLogin />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
