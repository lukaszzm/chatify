import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthContext from "./contexts/auth-context";
import { Layout } from "./layout";

import { Chat } from "./pages/Chat";
import { ChatBox } from "./pages/Chat/ChatBox";

import { Home } from "./pages/Home";
import { Form } from "./pages/Home/Form";

import { NotFound } from "./pages/NotFound";

import { Settings } from "./pages/Settings";
import { Profile } from "./pages/Settings/Profile";
import { Password } from "./pages/Settings/Password";
import { Appearance } from "./pages/Settings/Appearance";

import { Notes } from "./pages/Notes";
import { NoteInfo } from "./pages/Notes/NoteInfo";

export const App = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={isLoggedIn ? <Layout /> : <Navigate to="/" />}
      >
        <Route path="chat" element={<Chat />}>
          <Route path=":ID" element={<ChatBox />} />
        </Route>
        <Route path="notes" element={<Notes />}>
          <Route path=":ID" element={<NoteInfo noteId="" />} />
        </Route>
        <Route path="settings" element={<Settings />}>
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
