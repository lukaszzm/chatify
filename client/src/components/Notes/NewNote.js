import styles from "./NewNote.module.css";
import Modal from "../UI/Modal";
import Alert from "../UI/Alert";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useContext, useState } from "react";
import { noteSchema } from "../../schemas/schemas";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import { useDispatch } from "react-redux";
import { addNote } from "../../store/notesSlice";

const URL = `${process.env.REACT_APP_API_URL}/notes/add-note`;

const NewNote = ({ isModalOpen, closeModal }) => {
  const { token } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [axiosError, setAxiosError] = useState(null);
  const dispatch = useDispatch();

  return (
    <Modal
      isOpen={isModalOpen}
      closeModal={closeModal}
      title="New Note"
      confirmLabel="Create Note"
      isDisabledConfirm={isSubmitting}
      form="newNote"
    >
      <Formik
        initialValues={{
          title: "",
          text: "",
        }}
        validationSchema={noteSchema}
        onSubmit={async ({ title, text }) => {
          setIsSubmitting(true);
          setAxiosError(null);
          try {
            const createdAt = Date.now();
            const newNote = { title, text, createdAt };
            const response = await axios.post(`${URL}`, newNote, {
              headers: { Authorization: `Bearer ${token}` },
            });
            dispatch(addNote(response.data));
            closeModal();
          } catch (err) {
            setAxiosError("Something went wrong.");
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form
            id="newNote"
            className={styles.form}
            onChange={() => setAxiosError(null)}
          >
            <Field
              className={
                errors.title && touched.title
                  ? `${styles.field} ${styles["field-error"]}`
                  : `${styles.field}`
              }
              type="text"
              name="title"
              placeholder="Type your title"
            />
            <ErrorMessage component="p" className={styles.error} name="title" />
            <Field
              className={
                errors.text && touched.text
                  ? `${styles.field} ${styles["field-error"]}`
                  : `${styles.field}`
              }
              as="textarea"
              name="text"
              placeholder="Type your text"
            />
            <ErrorMessage component="p" className={styles.error} name="text" />
          </Form>
        )}
      </Formik>
      {isSubmitting ? (
        <LoadingSpinner />
      ) : axiosError ? (
        <Alert error>{axiosError}</Alert>
      ) : null}
    </Modal>
  );
};

export default NewNote;
