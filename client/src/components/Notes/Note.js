import { Link } from "react-router-dom";
import Card from "../UI/Card";
import styles from "./Note.module.css";


const Note = ({title, id, isActive }) => {
  return (
    <Link to={id}>
      <Card isActive={isActive} className={styles.card}>
        <h4>{title}</h4>
      </Card>
    </Link>
  );
};

export default Note;
