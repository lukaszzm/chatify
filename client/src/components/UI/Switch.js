import styles from "./Switch.module.css";

export const Switch = ({ withLabels, className, onChange, checked }) => {
  return (
    <div className={`${styles['switch-wrapper']} ${className}`}>
      {withLabels && <p className={styles.off}>OFF</p>}
      <label className={styles.switch}>
        <input type="checkbox" onChange={onChange} checked={checked} />
        <i></i>
      </label>
      {withLabels && <p className={styles.on}>ON</p>}
    </div>
  );
};