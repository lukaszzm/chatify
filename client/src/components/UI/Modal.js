import styles from "./Modal.module.css";
import Button from "./Button";

const Modal = ({ children, isOpen, setIsOpen, title, onConfirm }) => {
  return (
    isOpen &&
      <>
        <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
        <div className={styles.modal}>
          <div className={styles.title}>
            <h2>{title}</h2>
          </div>
          <div className={styles.content}>
            {children}
          </div>
          <div className={styles.buttons}>
            <Button outline onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={onConfirm}>Yes, {title}</Button>
          </div>
        </div>
      </>
    )
};

export default Modal;
