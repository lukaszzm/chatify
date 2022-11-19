import styles from "./SearchBar.module.css";
import { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../../../../contexts/auth-context";
import axios from "axios";
import { SearchedUser } from "../SearchedUser";
import searchIcon from "../../../../assets/icons/search.svg";
import { Input, LoadingSpinner } from "../../../../components/UI";
import { useDebounce } from "../../../../hooks/useDebounce";

export const SearchBar = () => {
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isTouched, setIsTouched] = useState(false);
  const [result, setResult] = useState(null);
  const { token } = useContext(AuthContext);
  const debouncedValue = useDebounce(inputValue, 300);

  const changeHandler = (e) => {
    inputRef.current.value.trim() !== ""
      ? setIsTouched(true)
      : setIsTouched(false);
    setInputValue(inputRef.current.value.trim());
  };

  const resetInput = () => {
    inputRef.current.value = "";
    setInputValue("");
    setIsTouched(false);
  };

  useEffect(() => {
    const searchUsers = async (input) => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/user-by-name/${input}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const users = response.data;
        users.length > 2 ? setResult(users.slice(0, 2)) : setResult(users);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedValue.trim() !== "") searchUsers(debouncedValue);
  }, [debouncedValue, token]);

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
        ) : result?.length === 0 ? (
          <p>No results.</p>
        ) : (
          result?.map(({ _id, firstName, lastName, profileImage }) => (
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