import styles from "./Modal.module.css";
import Button from "./Button";

const Modal = ({
  children,
  isOpen,
  setIsOpen,
  title,
  onConfirm,
  confirmLabel,
  form,
  isDisabledConfirm,
}) => {
  return (
    isOpen && (
      <>
        <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
        <div className={styles.modal}>
          <div className={styles.title}>
            <h2>{title}</h2>
          </div>
          <div className={styles.content}>{children}</div>
          <div className={styles.buttons}>
            <Button outline onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button disabled={isDisabledConfirm} form={form} onClick={onConfirm}>
              {confirmLabel || `Yes, ${title}`}
            </Button>
          </div>
        </div>
      </>
    )
  );
};

export default Modal;
