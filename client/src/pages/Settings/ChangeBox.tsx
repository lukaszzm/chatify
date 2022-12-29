import { useState } from "react";
import { Alert, Input, Button, Label } from "../../components/UI";
import { updateName } from "../../api/usersApi";
import { useQueryClient } from "@tanstack/react-query";

interface IChangeBoxProps {
  initialValue: string;
  value: string;
}

export const ChangeBox: React.FC<IChangeBoxProps> = ({
  initialValue,
  value,
}) => {
  const queryClient = useQueryClient();
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
      try {
        if (value === "First name") await updateName("first", fixedValue);
        if (value === "Last name") await updateName("last", fixedValue);
        queryClient.invalidateQueries(["auth"]);
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
