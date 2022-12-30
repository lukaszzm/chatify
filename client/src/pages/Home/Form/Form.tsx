import styles from "./Form.module.css";
import { Link } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { Button, Logo } from "../../../components/UI";

interface FormProps {
  isLogin?: boolean;
}

export const Form: React.FC<FormProps> = ({ isLogin }) => {
  return (
    <div className={styles.container}>
      <Logo onlyMobile />
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <div className={styles.info}>
        {isLogin ? (
          <p>Don&apos;t have account?</p>
        ) : (
          <p>Already have an account?</p>
        )}
        <Link to={isLogin ? "/register" : "/"}>
          <Button className={styles.button} outline={true}>
            {isLogin ? "Register" : "Login"}
          </Button>
        </Link>
      </div>
    </div>
  );
};
