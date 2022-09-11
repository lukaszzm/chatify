import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL = `${process.env.REACT_APP_API_URL}/auth`;

const AuthContext = React.createContext({
  isLoggedIn: false,
  token: null,
  socket: null,
  _id: null,
  firstName: null,
  lastName: null,
  profilePath: null,
  login: (token) => {},
  logout: () => {},
  register: (user) => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [profilePath, setProfilePath] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const localId = localStorage.getItem("id");

    if (localToken !== null && localId !== null) {
      setToken(localToken);
      setId(localId);
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = async ({ email, password }) => {
    try {
      const response = await axios.post(`${URL}/login`, { email, password });
      const { id, token } = response.data;
      setToken(token);
      setId(id);
      setIsLoggedIn(true);
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      navigate("/");
    } catch (err) {
      throw Error(err.response.data);
    }
  };

  const logoutHandler = () => {
    setToken(null);
    setId(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  const registerHandler = async ({
    email,
    password,
    firstName,
    lastName,
    profilePath,
  }) => {
    try {
      const response = await axios.post(`${URL}/register`, {
        email,
        password,
        firstName,
        lastName,
        profilePath,
      });
      const { id, token } = response.data;
      setToken(token);
      setId(id);
      setIsLoggedIn(true);
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      navigate("/");
    } catch (err) {
      throw Error(err.response.data);
    }
  };

  const setUserInfo = ({ firstName, lastName, profilePath }) => {
    setFirstName(firstName);
    setLastName(lastName);
    setProfilePath(profilePath);
  };

  const authValue = {
    isLoggedIn: isLoggedIn,
    token: token,
    socket: socket,
    _id: id,
    firstName: firstName,
    lastName: lastName,
    profilePath: profilePath,
    setSocket: setSocket,
    setUserInfo: setUserInfo,
    login: loginHandler,
    logout: logoutHandler,
    register: registerHandler,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;