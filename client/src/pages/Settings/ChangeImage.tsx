import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../contexts/auth-context";
import { Button, Alert, ImageInput} from "../../components/UI";

interface IChangeImageProps {
  defaultImage: string,
  url: string,
}

export const ChangeImage: React.FC<IChangeImageProps> = ({ defaultImage, url }) => {
  const { token, setUserInfo, _id, info } = useContext(AuthContext);
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
    if (!_id || !selectedImage || !info ) return;
    try {

      setIsTouched(false);
      const formData = new FormData();
      formData.append("id", _id);
      formData.append("profileImage", selectedImage);
      const request = await axios.patch(`${url}/update-profile-image/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newInfo = {
        ...info,
        profileImage: request.data
      }
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
