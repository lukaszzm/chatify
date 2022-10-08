import styles from './Modal.module.css';

const Modal = ({ children, isOpen, setIsOpen  }) => {
    return (
        isOpen && <>
        <div className={styles.backdrop} onClick={()=> setIsOpen(false)} />
        <div className={styles.modal}>
            { children }
        </div>
        </>
    )
}

export default Modal;