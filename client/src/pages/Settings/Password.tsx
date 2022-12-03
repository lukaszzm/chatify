import { useContext, useRef, useState } from "react";
import axios from "axios";
import AuthContext from "../../contexts/auth-context";
import {
  Topbar,
  Input,
  Button,
  Alert,
  Label,
  SettingsContainer,
} from "../../components/UI";

const URL = `${process.env.REACT_APP_API_URL}/auth/update-password`;

export const Password = () => {
  const { token } = useContext(AuthContext);
  const [isCurrentPasswordTouched, setIsCurrentPasswordTouched] =
    useState(false);
  const [isNewPasswordTouched, setIsNewPasswordTouched] = useState(false);
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const currentChangeHandler = () => {
    setError(null);
    setSuccess(null);
    setIsCurrentPasswordTouched(true);
  };

  const newChangeHandler = () => {
    setError(null);
    setSuccess(null);
    setIsNewPasswordTouched(true);
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentPassword = currentPasswordRef.current!.value;
    const newPassword = newPasswordRef.current!.value;
    if (newPassword.length < 8) {
      setError("Your new password must be at least 8 characters long.");
      setIsNewPasswordTouched(false);
      return;
    } else {
      try {
        setIsCurrentPasswordTouched(false);
        setIsNewPasswordTouched(false);
        await axios.patch(
          URL,
          { currentPassword: currentPassword, newPassword: newPassword },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSuccess("Success! Your password has been changed.");
      } catch (err: unknown) {
        setIsNewPasswordTouched(true);
        axios.isAxiosError(err)
          ? setError(err.message)
          : setError("Something went wrong.");
      }
    }
  };
  return (
    <>
      <Topbar backTo="/dashboard/settings">
        <h3>Password Settings</h3>
      </Topbar>
      <SettingsContainer>
        <form onSubmit={submitHandler}>
          <Label htmlFor="currentPassword">Current password</Label>
          <Input
            onChange={currentChangeHandler}
            id="currentPassword"
            ref={currentPasswordRef}
            type="password"
            placeholder=""
          ></Input>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            onChange={newChangeHandler}
            id="newPassword"
            ref={newPasswordRef}
            type="password"
            placeholder=""
          ></Input>
          {error && <Alert error>{error}</Alert>}
          {success && <Alert>{success}</Alert>}
          <Button
            maxWidth="80px"
            disabled={!isCurrentPasswordTouched || !isNewPasswordTouched}
            type="submit"
          >
            Save
          </Button>
        </form>
      </SettingsContainer>
    </>
  );
};
