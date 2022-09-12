import styles from "./ChangeBox.module.css";
import { useContext, useState } from 'react';
import Input from "../UI/Input";
import Button from "../UI/Button";
import axios from 'axios';
import AuthContext from "../../store/auth-context";

const ChangeBox = ({initialValue, value, url}) => {
    const { token } = useContext(AuthContext);
    const [isTouched, setIsTouched] = useState(false);
    const [inputValue, setInputValue] = useState(initialValue);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const changeHandler = (e) => {
        setIsTouched(true);
        setInputValue(e.target.value);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsTouched(false);
        if(inputValue.trim() !== "") {
          const request = await axios.patch(`${url}/${inputValue.trim()}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          console.log(request);
        setError("Something went wrong. Try again.")
        setSuccess(`Success. Your ${value.toLowerCase()} was changed.`)
        } else {
        setError(`Your ${value.toLowerCase()} cannot be empty string.`)
        }
    }

    return (
        <form className={styles.form} onSubmit={submitHandler}>
        <label className={styles.label} htmlFor={value}>
          {value}
        </label>
        <Input onChange={changeHandler} className={styles.input} value={inputValue}></Input>
        {error ? <div className={styles['error-alert']}><p>{error}</p></div> : null}
        {success ? <div className={styles['success-alert']}><p>{success}</p></div> : null}
        <Button className={styles.button} disabled={!isTouched} type="submit">
          Save
        </Button>
      </form>
    )
}

export default ChangeBox;