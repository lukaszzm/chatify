import styles from "./NoteContent.module.css";
import moment from "moment";

interface NoteContentProps {
  text: string,
  createdAt: string
}

export const NoteContent: React.FC<NoteContentProps> = ({ text, createdAt }) => {
  return (
    <div className={styles.container}>
      <p className={styles.date}>
        Created at {moment(createdAt).format("DD.MM.YYYY")}
      </p>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default NoteContent;
