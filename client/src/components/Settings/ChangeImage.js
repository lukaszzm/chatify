import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import { Button, Alert, ImageInput} from "../UI";

const ChangeImage = ({ defaultImage, url }) => {
  const { token, _id, setUserInfo, firstName, lastName } = useContext(AuthContext);
  const [isTouched, setIsTouched] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const changeHandler = (file) => {
    setError(null);
    setSuccess(null);
    setIsTouched(true);
    setSelectedFile(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsTouched(false);
      const formData = new FormData();
      formData.append("id", _id);
      formData.append("profileImage", selectedFile);
      // ${url}
      const request = await axios.patch(`http://localhost:8000/api/auth/update-profile-image/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newPath = request.data;
      setUserInfo({ firstName, lastName, profileImage: newPath });
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

export default ChangeImage;
