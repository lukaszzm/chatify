import styles from "./LoginForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../../schemas/schemas";
import Button from "../UI/Button";
import AuthContext from "../../store/auth-context";
import { useContext, useState } from "react";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [fetchError, setFetchError] = useState(null);
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={async (values) => {
        setFetchError(null);
        try {
          await login(values);
        } catch (err) {
          err.message
            ? setFetchError(err.message)
            : setFetchError("Something went wrong.");
        }
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
          {fetchError && <p className={styles["fetch-error"]}>{fetchError}</p>}
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

export default LoginForm;
