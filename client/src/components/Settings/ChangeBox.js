import styles from "./ChangeBox.module.css";
import { useState } from 'react';
import Input from "../UI/Input";
import Button from "../UI/Button";

const ChangeBox = ({initialValue, value}) => {
    const [isTouched, setIsTouched] = useState(false);
    const [inputValue, setInputValue] = useState(initialValue);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const changeHandler = (e) => {
        setIsTouched(true);
        setInputValue(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setIsTouched(false);
        if(inputValue.trim() !== "") {
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