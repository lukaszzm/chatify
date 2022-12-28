import { axiosConfig } from "../service/axiosConfig";

export const searchUsers = async (input: string) => {
  const response = await axiosConfig.get(`/auth/user-by-name/${input}`);
  return response.data;
};

export const updatePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  const response = await axiosConfig.patch("auth/update-password", {
    currentPassword,
    newPassword,
  });
  return response.data;
};

export const updateProfileImage = async (_id: string, image: File) => {
  const formData = new FormData();
  formData.append("id", _id);
  formData.append("profileImage", image);
  const request = await axiosConfig.patch(
    "auth/update-profile-image/",
    formData
  );
  return request.data;
};

export const updateName = async (type: "first" | "last", value: string) => {
  const response =
    type == "first"
      ? await axiosConfig.patch(`auth/update-first-name/${value}`)
      : await axiosConfig.patch(`auth/update-last-name/${value}`);
  return response.data;
};
