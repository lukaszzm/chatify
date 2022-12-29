import styles from "./LoginForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerSchema } from "../../../schemas/schemas";
import { useState } from "react";
import { Alert, Button, ImageInput } from "../../../components/UI";
import { useAuth } from "../../../hooks/useAuth";

export const RegisterForm = () => {
  const { registerMutation } = useAuth();
  const [axiosError, setAxiosError] = useState<string | null>(null);
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        profileImage: null,
        firstName: "",
        lastName: "",
      }}
      validationSchema={registerSchema}
      onSubmit={async (values) => {
        setAxiosError(null);
        try {
          await registerMutation.mutateAsync(values);
        } catch (err) {
          const errorMessage = (err as Error).message;
          errorMessage
            ? setAxiosError(errorMessage)
            : setAxiosError("Something went wrong.");
        }
      }}
    >
      {({ errors, touched, isSubmitting, setFieldValue }) => (
        <Form className={styles.form}>
          <h1>Register</h1>
          <label htmlFor="email">Email</label>
          <Field
            className={
              errors.email && touched.email
                ? `${styles.field} ${styles["field-error"]}`
                : `${styles.field}`
            }
            type="email"
            name="email"
            placeholder="placeholder@gmail.com"
          />
          <ErrorMessage component="p" className={styles.error} name="email" />
          <label htmlFor="password">Password</label>
          <Field
            className={
              errors.password && touched.password
                ? `${styles.field} ${styles["field-error"]}`
                : `${styles.field}`
            }
            type="password"
            name="password"
            placeholder="atleast 8 characters"
          />
          <ErrorMessage
            component="p"
            className={styles.error}
            name="password"
          />
          <label htmlFor="profileImage">Profile Image</label>
          <ImageInput
            name="profileImage"
            onChange={(file) => {
              setFieldValue("profileImage", file);
            }}
          />
          <label htmlFor="firstName">First Name</label>
          <Field
            className={
              errors.firstName && touched.firstName
                ? `${styles.field} ${styles["field-error"]}`
                : `${styles.field}`
            }
            type="text"
            name="firstName"
            placeholder="John"
          />
          <ErrorMessage
            component="p"
            className={styles.error}
            name="firstName"
          />

          <label htmlFor="lastName">Last Name</label>
          <Field
            className={
              errors.lastName && touched.lastName
                ? `${styles.field} ${styles["field-error"]}`
                : `${styles.field}`
            }
            type="text"
            name="lastName"
            placeholder="Smith"
          />
          <ErrorMessage
            component="p"
            className={styles.error}
            name="lastName"
          />

          {axiosError && <Alert error>{axiosError}</Alert>}
          <Button
            disabled={isSubmitting}
            className={styles.button}
            type="submit"
          >
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};
