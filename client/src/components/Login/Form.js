import styles from "./Form.module.css";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import logoIcon from "../../assets/logo.svg";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Form = ({ isLogin }) => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logoIcon} alt="Logo" />
        <h1>Chatify</h1>
      </div>
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <div className={styles.info}>
        {isLogin ? <p>Don't have account?</p> : <p>Already have an account?</p>}
        <Link to={isLogin ? "/register" : "/"}>
          <Button className={styles.button} outline={true}>
            {isLogin ? "Register" : "Login"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Form;
