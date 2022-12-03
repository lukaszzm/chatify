import styles from "./Welcome.module.css";
import textingImg from "../../../assets/texting.svg";

export const Welcome = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Talk with your friends on <span className={styles.logo}>Chatify.</span>
      </h1>
      <img
        src={textingImg}
        alt="Man chatting with friend."
        className={styles.img}
      />
    </div>
  );
};
