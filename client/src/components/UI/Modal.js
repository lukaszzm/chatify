import styles from "./Modal.module.css";
import { Button } from "../UI";

export const Modal = ({
  children,
  isOpen,
  closeModal,
  title,
  onConfirm,
  confirmLabel,
  form,
  isDisabledConfirm,
}) => {
  return (
    isOpen && (
      <>
        <div className={styles.backdrop} onClick={closeModal} />
        <div className={styles.modal}>
          <div className={styles.title}>
            <h2>{title}</h2>
          </div>
          <div className={styles.content}>{children}</div>
          <div className={styles.buttons}>
            <Button outline onClick={closeModal}>
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

