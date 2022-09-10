import styles from "./SearchedUser.module.css";
import { Link } from "react-router-dom";
import ProfileImage from "../../UI/ProfileImage";
import Button from "../../UI/Button";

const SearchedUser = ({ id, firstName, lastName, profilePath, onClick}) => {

  return (
    <div className={styles.container}>
      <ProfileImage
        className={styles.photo}
        src={profilePath}
        alt="user_image"
      />
      <p className={styles.text}>
        {firstName} {lastName}
      </p>
      <Link to={id} onClick={onClick}>
        <Button className={styles.button}>Chat</Button>
      </Link>
    </div>
  );
};

export default SearchedUser;
