import { axiosConfig } from "../service/axiosConfig";
import { getUserInfo } from "./chatApi";
import {
  Credentials,
  RegisterCredentials,
} from "../interfaces/Credentials.interface";

export const login = async ({ email, password }: Credentials) => {
  const response = await axiosConfig.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const register = async ({
  email,
  password,
  firstName,
  lastName,
  profileImage,
}: RegisterCredentials) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  if (profileImage) formData.append("profileImage", profileImage);

  const response = await axiosConfig.post("auth/register", formData);
  return response.data;
};

export const getLoggedInUser = async () => {
  const localToken = localStorage.getItem("token");
  const localId = localStorage.getItem("id");
  if (localToken !== null && localId !== null) {
    const response = await getUserInfo(localId);
    return response[0];
  } else {
    return null;
  }
};
