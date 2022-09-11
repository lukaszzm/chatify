import styles from "./SearchBar.module.css";
import { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../../../store/auth-context";
import axios from "axios";
import SearchedUser from "./SearchedUser";
import Input from "../../UI/Input";
import searchIcon from "../../../assets/search.svg";

const SearchBar = () => {
  const searchInputRef = useRef();
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTouched, setIsTouched] = useState(false);
  const [result, setResult] = useState([]);
  const { token } = useContext(AuthContext);

  const changeHandler = (e) => {
    setIsTouched(true);
    setSearchInput(searchInputRef.current.value.trim());
  };

  const resetInput = () => {
    searchInputRef.current.value = '';
    setSearchInput("");
  }

  useEffect( () => {
    const fetchData = async () => {
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
      <div className={styles.wrapper}>
        <img src={searchIcon} alt="Search Icon." />
        <Input
          className={styles["search-bar"]}
          onChange={changeHandler}
          placeholder="Search user"
          ref={searchInputRef}
        />
      </div>
      <div className={styles["results-wrapper"]}>
        {loading ? <p>Loading...</p> :
        error ? <p>Something went wrong.</p> :
        result.length > 0 ?
        result.map(({_id, firstName, lastName, profilePath}) => (
          <SearchedUser
            key={_id}
            id={_id}
            firstName={firstName}
            lastName={lastName}
            profilePath={profilePath}
            onClick={resetInput}
          />
        )) : null}
      </div>
    </>
  );
};

export default SearchBar;