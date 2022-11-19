import { Link } from "react-router-dom";
import { Card } from "../../../components/UI";
import styles from "./Note.module.css";


export const Note = ({title, id, isActive }) => {
  return (
    <Link to={id}>
      <Card isActive={isActive} className={styles.card}>
        <h4>{title}</h4>
      </Card>
    </Link>
  );
};
