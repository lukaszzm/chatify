import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/User.interface";
import { axiosConfig } from "../service/axiosConfig";
import axios from "axios";

interface Credentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends Credentials {
  firstName: string;
  lastName: string;
  profileImage: string | null;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

interface AuthContextInterface {
  isLoggedIn: boolean;
  _id: string | null;
  info: IUser | null;
  setUserInfo: (user: IUser) => void;
  login: ({ email, password }: Credentials) => void;
  logout: () => void;
  register: ({
    email,
    password,
    firstName,
    lastName,
    profileImage,
  }: RegisterCredentials) => void;
}

const AuthContext = React.createContext<AuthContextInterface>({
  isLoggedIn: false,
  _id: null,
  info: null,
  setUserInfo: () => {
    /* do nothing */
  },
  login: () => {
    /* do nothing */
  },
  logout: () => {
    /* do nothing */
  },
  register: () => {
    /* do nothing */
  },
});

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [id, setId] = useState<string | null>(null);
  const [info, setInfo] = useState<IUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const login = async ({ email, password }: Credentials) => {
    try {
      const response = await axiosConfig.post("/auth/login", {
        email,
        password,
      });
      const { id, token, firstName, lastName, profileImage } = response.data;
      setId(id);
      setIsLoggedIn(true);
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      setInfo({ firstName, lastName, profileImage, _id: id });
      navigate("/");
    } catch (err) {
      const errorMessage =
        axios.isAxiosError(err) && err.response
          ? (err.response.data as string)
          : "Something went wrong.";
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    setId(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  const register = async ({
    email,
    password,
    firstName,
    lastName,
    profileImage,
  }: RegisterCredentials) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      if (profileImage) formData.append("profileImage", profileImage);
      const response = await axiosConfig.post("auth/register", formData);
      const { id, token, profileImage: currentProfileImage } = response.data;
      setId(id);
      setIsLoggedIn(true);
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      setInfo({
        firstName,
        lastName,
        profileImage: currentProfileImage,
        _id: id,
      });
      navigate("/");
    } catch (err) {
      const errorMessage =
        axios.isAxiosError(err) && err.response
          ? (err.response.data as string)
          : "Something went wrong.";
      throw new Error(errorMessage);
    }
  };

  useEffect(() => {
    const getUser = async (id: string) => {
      try {
        const result = await axiosConfig.get(`/users/id/${id}`);
        const [user] = result.data;
        setInfo(user);
        setId(id);
        setIsLoggedIn(true);
      } catch (err) {
        navigate("/");
      }
    };

    const localToken = localStorage.getItem("token");
    const localId = localStorage.getItem("id");

    if (localToken !== null && localId !== null) getUser(localId);
  }, [navigate]);

  const setUserInfo = (user: IUser) => {
    setInfo(user);
  };

  const authValue = {
    isLoggedIn,
    _id: id,
    info,
    setUserInfo,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
