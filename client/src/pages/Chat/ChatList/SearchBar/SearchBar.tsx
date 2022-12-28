import styles from "./SearchBar.module.css";
import { useEffect, useState, useRef } from "react";
import { SearchedUser } from "../SearchedUser";
import searchIcon from "../../../../assets/icons/search.svg";
import { Input, LoadingSpinner } from "../../../../components/UI";
import { useDebounce } from "../../../../hooks/useDebounce";
import { IUser } from "../../../../interfaces/User.interface";
import { searchUsers } from "../../../../api/authApi";

export const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [result, setResult] = useState<IUser[]>([]);
  const debouncedValue = useDebounce(inputValue, 300);

  const changeHandler = () => {
    inputRef.current!.value.trim() !== ""
      ? setIsTouched(true)
      : setIsTouched(false);
    setInputValue(inputRef.current!.value.trim());
  };

  const resetInput = () => {
    inputRef.current!.value = "";
    setInputValue("");
    setIsTouched(false);
  };

  useEffect(() => {
    const searchUsersHandler = async (input: string) => {
      setIsLoading(true);
      try {
        const users = await searchUsers(input);
        users.length > 2 ? setResult(users.slice(0, 2)) : setResult(users);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedValue.trim() !== "") searchUsersHandler(debouncedValue);
  }, [debouncedValue]);

  return (
    <>
      <div className={styles["search-wrapper"]}>
        <img src={searchIcon} alt="Search Icon." />
        <Input
          className={styles["search-bar"]}
          onChange={changeHandler}
          placeholder="Search user"
          ref={inputRef}
        />
      </div>
      <div className={styles["results-wrapper"]}>
        {!isTouched ? null : isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <p>Something went wrong.</p>
        ) : result.length === 0 ? (
          <p>No results.</p>
        ) : (
          result.map(({ _id, firstName, lastName, profileImage }) => (
            <SearchedUser
              key={_id}
              id={_id}
              firstName={firstName}
              lastName={lastName}
              profileImage={profileImage}
              onClick={resetInput}
            />
          ))
        )}
      </div>
    </>
  );
};
