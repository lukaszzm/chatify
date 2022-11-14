import { useContext, useRef, useState } from "react";
import axios from 'axios';
import AuthContext from "../../store/auth-context";
import { Topbar, Input, Button, Alert, Label, SettingsContainer} from "../UI";

const URL = `${process.env.REACT_APP_API_URL}/auth/update-password`;

const Password = () => {
    const { token } = useContext(AuthContext);
    const [isCurrentPasswordTouched, setIsCurrentPasswordTouched] = useState(false);
    const [isNewPasswordTouched, setIsNewPasswordTouched] = useState(false);
    const currentPasswordRef = useRef();
    const newPasswordRef = useRef();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false); 
    
    const currentChangeHandler = (e) => {
        setError(null);
        setSuccess(null);
        setIsCurrentPasswordTouched(true);
    }

    const newChangeHandler = (e) => {
        setError(null);
        setSuccess(null);
        setIsNewPasswordTouched(true);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const currentPassword = currentPasswordRef.current.value;
        const newPassword = newPasswordRef.current.value;
        if(newPassword.length < 8) {
          setError("Your new password must be at least 8 characters long.")
          setIsNewPasswordTouched(false);
          return;
        } else {
          try {
            setIsCurrentPasswordTouched(false);
            setIsNewPasswordTouched(false);
            await axios.patch(URL, { currentPassword: currentPassword, newPassword: newPassword }, {
              headers: { Authorization: `Bearer ${token}` }});
            setSuccess("Success! Your password has been changed.")
            
          } catch (err) {
            setIsNewPasswordTouched(true);
            setError(err.response.data);
          }
        }
    }
  return (
    <>
      <Topbar backTo="/dashboard/settings">
        <h3>Password Settings</h3>
      </Topbar>
      <SettingsContainer>
        <form onSubmit={submitHandler}>
          <Label htmlFor="currentPassword">
            Current password
          </Label>
          <Input
            onChange={currentChangeHandler}
            id="currentPassword"
            ref={currentPasswordRef}
            type="password"
          ></Input>
          <Label htmlFor="newPassword">
          New Password
          </Label>
          <Input
            onChange={newChangeHandler}
            id="newPassword"
            ref={newPasswordRef}
            type="password"
          ></Input>
          {error && <Alert error>{error}</Alert>}
          {success && <Alert>{success}</Alert>}
          <Button maxWidth="80px" disabled={!isCurrentPasswordTouched || !isNewPasswordTouched} type="submit">
            Save
          </Button>
        </form>
      </SettingsContainer>
    </>
  );
};

export default Password;
