import styles from "./LoginForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../../../schemas/schemas";
import { useState } from "react";
import { Alert, Button } from "../../../components/UI";
import { useAuth } from "../../../hooks/useAuth";
import { AxiosError } from "axios";

export const LoginForm = () => {
  const { loginMutation } = useAuth();
  const [axiosError, setAxiosError] = useState<string | null>(null);

  const handleFormSubmit = async (values: {
    email: string;
    password: string;
  }) => {
    setAxiosError(null);
    try {
      await loginMutation.mutateAsync(values);
    } catch (err) {
      const error = err as AxiosError;
      setAxiosError(error.response?.data as string);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={async (values) => {
        await handleFormSubmit(values);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={styles.form}>
          <h1>Login</h1>
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
          {axiosError && <Alert error>{axiosError}</Alert>}
          <Button
            disabled={isSubmitting}
            className={styles.button}
            type="submit"
          >
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};
