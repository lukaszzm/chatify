import styles from "./NewNote.module.css";
import { noteSchema } from "../../../schemas/schemas";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newNote } from "../../../api";
import { Modal, Alert, LoadingSpinner } from "../../../components/UI";

export const NewNote = ({ isModalOpen, closeModal }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(
    ({ title, text }) => newNote({ title, text }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["notes"]);
        closeModal();
      },
    }
  );

  return (
    <Modal
      isOpen={isModalOpen}
      closeModal={closeModal}
      title="New Note"
      confirmLabel="Create Note"
      isDisabledConfirm={isLoading}
      form="newNote"
    >
      <Formik
        initialValues={{
          title: "",
          text: "",
        }}
        validationSchema={noteSchema}
        onSubmit={async ({ title, text }) => {
          mutate({ title, text });
        }}
      >
        {({ errors, touched }) => (
          <Form
            id="newNote"
            className={styles.form}
            onChange={() => console.log()}
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
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <Alert error>Something went wrong. Try again later.</Alert>
      ) : null}
    </Modal>
  );
};
