import styles from "./Switch.module.css";

const Switch = ({ withLabels, className }) => {

  return (
    <div className={`${styles['switch-wrapper']} ${className}`}>
      {withLabels && <p className={styles.off}>OFF</p>}
      <label className={styles.switch}>
        <input type="checkbox" />
        <i></i>
      </label>
      {withLabels && <p className={styles.on}>ON</p>}
    </div>
  );
};

export default Switch;
