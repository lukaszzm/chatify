import styles from "./Switch.module.css";

const Switch = ({ labels }) => {
  return (
    <div className={styles['switch-wrapper']}>
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
