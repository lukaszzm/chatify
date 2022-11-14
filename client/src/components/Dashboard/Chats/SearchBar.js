import styles from "./SearchBar.module.css";
import { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../../../store/auth-context";
import axios from "axios";
import SearchedUser from "./SearchedUser";
import searchIcon from "../../../assets/icons/search.svg";
import { Input, LoadingSpinner } from "../../UI";

const SearchBar = () => {
  const searchInputRef = useRef();
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTouched, setIsTouched] = useState(false);
  const [result, setResult] = useState([]);
  const { token } = useContext(AuthContext);

  const changeHandler = (e) => {
    if (searchInputRef.current.value.trim() === "") {
      setIsTouched(false);
    } else {
      setIsTouched(true);
    }
    setSearchInput(searchInputRef.current.value.trim());
  };

  const resetInput = () => {
    searchInputRef.current.value = '';
    setSearchInput("");
    setIsTouched(false);
  }

  useEffect( () => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/user-by-name/${searchInput}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const users = response.data;
        users.length > 2 ? setResult(users.slice(0, 2)) : setResult(users);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    
    if (searchInput.trim() !== "") {
      fetchData();
    } else if (isTouched) {
      setResult([]);
    }
  }, [searchInput, token, isTouched]);

  return (
    <>
      <div className={styles['search-wrapper']}>
        <img src={searchIcon} alt="Search Icon." />
        <Input
          className={styles["search-bar"]}
          onChange={changeHandler}
          placeholder="Search user"
          ref={searchInputRef}
        />
      </div>
      <div className={styles["results-wrapper"]}>
        {!isTouched ? null :
        loading ? <LoadingSpinner /> :
        error ? <p>Something went wrong.</p> :
        result.length === 0 ? <p>No results.</p> :
         result.map(({_id, firstName, lastName, profileImage}) => (
          <SearchedUser
            key={_id}
            id={_id}
            firstName={firstName}
            lastName={lastName}
            profileImage={profileImage}
            onClick={resetInput}
          />
        ))}
      </div>
    </>
  );
};

export default SearchBar;
