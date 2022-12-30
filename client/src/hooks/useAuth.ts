import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLoggedInUser, login, register } from "../api/authApi";
import {
  Credentials,
  RegisterCredentials,
} from "../interfaces/Credentials.interface";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/User.interface";

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: authData, ...rest } = useQuery<IUser>({
    queryKey: ["auth"],
    queryFn: () => getLoggedInUser(),
    onError: () => logout(),
  });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: Credentials) =>
      login({ email, password }),
    onSuccess: ({ token, id }) => {
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      navigate("/dashboard/chat");
    },
  });

  const registerMutation = useMutation({
    mutationFn: ({
      email,
      password,
      firstName,
      lastName,
      profileImage,
    }: RegisterCredentials) =>
      register({ email, password, firstName, lastName, profileImage }),
    onSuccess: ({ token, id }) => {
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      navigate("/dashboard/chat");
    },
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    queryClient.setQueryData(["auth"], null);
    navigate("/");
  };

  return { authData, loginMutation, registerMutation, logout, ...rest };
};
