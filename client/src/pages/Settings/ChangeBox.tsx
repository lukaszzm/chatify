import { useContext, useState } from "react";
import AuthContext from "../../contexts/auth-context";
import { Alert, Input, Button, Label } from "../../components/UI";
import { updateName } from "../../api/authApi";

interface IChangeBoxProps {
  initialValue: string;
  value: string;
}

export const ChangeBox: React.FC<IChangeBoxProps> = ({
  initialValue,
  value,
}) => {
  const { setUserInfo, info } = useContext(AuthContext);
  const [isTouched, setIsTouched] = useState(false);
  const [inputValue, setInputValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true);
    setError(null);
    setSuccess(null);
    setInputValue(e.target.value);
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTouched(false);
    const fixedValue = inputValue.trim();
    if (fixedValue !== "") {
      if (!info) return;
      try {
        if (value === "First name") {
          await updateName("first", fixedValue);
          setUserInfo({
            firstName: fixedValue,
            lastName: info.lastName,
            profileImage: info.profileImage,
            _id: info._id,
          });
        }
        if (value === "Last name") {
          await updateName("last", fixedValue);
          setUserInfo({
            firstName: info.firstName,
            lastName: fixedValue,
            profileImage: info.profileImage,
            _id: info._id,
          });
        }
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
      <Input onChange={changeHandler} value={inputValue} placeholder=""></Input>
      {error && <Alert error>{error}</Alert>}
      {success && <Alert>{success}</Alert>}
      <Button maxWidth="80px" disabled={!isTouched} type="submit">
        Save
      </Button>
    </form>
  );
};
