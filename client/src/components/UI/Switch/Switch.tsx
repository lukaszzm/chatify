import styles from "./Switch.module.css";

interface SwitchProps {
  withLabels?: boolean,
  className?: string,
  onChange: () => void
  checked: boolean
}

export const Switch: React.FC<SwitchProps> = ({ withLabels, className, onChange, checked }) => {
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