import styles from "./Welcome.module.css";
import welcomeImg from '../../assets/welcome2.png';

const Welcome = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Talk with your friends on <span className={styles.logo}>Chatify.</span></h1>
      <img src={welcomeImg} alt="Man chatting with friend." className={styles.img} />
    </div>
  );
};

export default Welcome;
