import styles from "./Switch.module.css";

const Switch = ({ labels, className }) => {

  return (
    <div className={`${styles['switch-wrapper']} ${className}`}>
      {labels && <p className={styles.off}>OFF</p>}
      <label className={styles.switch}>
        <input type="checkbox" />
        <i></i>
      </label>
      {labels && <p className={styles.on}>ON</p>}
    </div>
  );
};

export default Switch;
