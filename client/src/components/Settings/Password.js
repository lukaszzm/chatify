import styles from "./Password.module.css";
import { useContext, useRef, useState } from "react";
import axios from 'axios';
import Topbar from "../UI/Topbar";
import Input from "../UI/Input";
import Button from "../UI/Button";
import AuthContext from "../../store/auth-context";

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
            await axios.patch(URL, { currentPassword, newPassword }, {
              headers: { Authorization: `Bearer ${token}` }});
            setSuccess("Success! Your password has been changed.")
            
          } catch (err) {
            setError(err);
          } finally {
            setIsCurrentPasswordTouched(false);
            setIsNewPasswordTouched(false);
          }
        }
    }
  return (
    <>
      <Topbar backTo="/settings">
        <h3>Password Settings</h3>
      </Topbar>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={submitHandler}>
          <label className={styles.label} htmlFor="currentPassoword">
            Current password
          </label>
          <Input
            onChange={currentChangeHandler}
            id="currentPassword"
            ref={currentPasswordRef}
            className={styles.input}
            type="password"
          ></Input>
          <label className={styles.label} htmlFor="newPassoword">
            New password
          </label>
          <Input
            onChange={newChangeHandler}
            id="newPassword"
            ref={newPasswordRef}
            className={styles.input}
            type="password"
          ></Input>
          {error ? <div className={styles['error-alert']}><p>{error}</p></div> : null}
          {success ? <div className={styles['success-alert']}><p>{success}</p></div> : null}
          <Button className={styles.button} disabled={!isCurrentPasswordTouched || !isNewPasswordTouched} type="submit">
            Save
          </Button>
        </form>
      </div>
    </>
  );
};

export default Password;
