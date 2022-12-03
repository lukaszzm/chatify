import { Link } from "react-router-dom";
import { Card } from "../../../components/UI";
import styles from "./Note.module.css";

interface INoteProps {
  isActive: boolean
  title: string,
  id: string
}

export const Note: React.FC<INoteProps> = ({title, id, isActive }) => {
  return (
    <Link to={id}>
      <Card isActive={isActive} className={styles.card}>
        <h4>{title}</h4>
      </Card>
    </Link>
  );
};
