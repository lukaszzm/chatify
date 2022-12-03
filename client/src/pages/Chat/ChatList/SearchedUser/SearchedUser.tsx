import styles from "./SearchedUser.module.css";
import { Link } from "react-router-dom";
import { ProfileImage, Button } from "../../../../components/UI";

interface SearchedUserProps {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  onClick: () => void;
}

export const SearchedUser: React.FC<SearchedUserProps> = ({
  id,
  firstName,
  lastName,
  profileImage,
  onClick,
}) => {
  return (
    <div className={styles.container}>
      <ProfileImage src={profileImage} />
      <p className={styles.text}>
        {firstName} {lastName}
      </p>
      <Link to={id} onClick={onClick}>
        <Button className={styles.button}>Chat</Button>
      </Link>
    </div>
  );
};
