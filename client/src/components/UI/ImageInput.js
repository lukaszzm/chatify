import styles from './ImageInput.module.css';
import { useRef, useState } from 'react';
import ProfileImage from './ProfileImage';
import Button from './Button';

const ImageInput = ({ name, onChange }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const inputRef = useRef();

    const clickHandler = () => {
        inputRef.current.click();
    }
  return (
    <div className={styles['input-container']}>
      {selectedImage && (
        <ProfileImage size='large' className={styles.preview} src={URL.createObjectURL(selectedImage)} />
      )}
      <input
        type="file"
        name={name}
        accept="image/png, image/jpg, image/jpeg"
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
          onChange(event.target.files[0]);
        }}
        style={{display: 'none'}}
        ref={inputRef}
      />
      <Button outline type='button' onClick={clickHandler} className={styles.button}>Upload Profile Image</Button>
    </div>
  );
}

export default ImageInput;