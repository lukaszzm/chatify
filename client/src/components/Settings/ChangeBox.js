import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import { Alert, Input, Button, Label } from "../UI";

const ChangeBox = ({ initialValue, value, url }) => {
  const { token, setUserInfo, firstName, lastName, profileImage } =
    useContext(AuthContext);
  const [isTouched, setIsTouched] = useState(false);
  const [inputValue, setInputValue] = useState(initialValue);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const changeHandler = (e) => {
    setIsTouched(true);
    setError(null);
    setSuccess(null);
    setInputValue(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsTouched(false);
    const fixedValue = inputValue.trim();
    if (fixedValue !== "") {
      try {
        await axios.patch(`${url}/${fixedValue}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (value === "First name")
          setUserInfo({ firstName: fixedValue, lastName, profileImage });
        if (value === "Last name")
          setUserInfo({ firstName, lastName: fixedValue, profileImage });
        setSuccess(`Success. Your ${value.toLowerCase()} was changed.`);
      } catch (err) {
        setError("Something went wrong. Try again.");
      }
    } else {
      setError(`Your ${value.toLowerCase()} cannot be empty string.`);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <Label htmlFor={value}> {value} </Label>
      <Input
        onChange={changeHandler}
        value={inputValue}
      ></Input>
      {error && <Alert error>{error}</Alert>}
      {success && <Alert>{success}</Alert>}
      <Button maxWidth="80px" disabled={!isTouched} type="submit">
        Save
      </Button>
    </form>
  );
};

export default ChangeBox;
