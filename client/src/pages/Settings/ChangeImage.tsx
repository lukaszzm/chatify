import { useContext, useState } from "react";
import AuthContext from "../../contexts/auth-context";
import { Button, Alert, ImageInput } from "../../components/UI";
import { updateProfileImage } from "../../api/authApi";

interface IChangeImageProps {
  defaultImage: string;
}

export const ChangeImage: React.FC<IChangeImageProps> = ({ defaultImage }) => {
  const { setUserInfo, _id, info } = useContext(AuthContext);
  const [isTouched, setIsTouched] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const changeHandler = (image: File) => {
    setError(null);
    setSuccess(null);
    setIsTouched(true);
    setSelectedImage(image);
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!_id || !selectedImage || !info) return;
    try {
      setIsTouched(false);
      const newImage = await updateProfileImage(_id, selectedImage);
      const newInfo = {
        ...info,
        profileImage: newImage,
      };
      setUserInfo(newInfo);
      setSuccess("Success! Your profile image has been changed.");
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <ImageInput
        defaultImage={defaultImage}
        name="profileImage"
        onChange={changeHandler}
      />
      {error && <Alert error>{error}</Alert>}
      {success && <Alert>{success}</Alert>}
      <Button maxWidth="160px" type="submit" disabled={!isTouched}>
        Save new image
      </Button>
    </form>
  );
};
