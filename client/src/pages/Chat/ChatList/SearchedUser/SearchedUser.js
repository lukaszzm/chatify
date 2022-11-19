import styles from "./SearchedUser.module.css";
import { Link } from "react-router-dom";
import { ProfileImage, Button } from "../../../../components/UI";

export const SearchedUser = ({ id, firstName, lastName, profileImage, onClick}) => {

  return (
    <div className={styles.container}>
      <ProfileImage
        src={profileImage}
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