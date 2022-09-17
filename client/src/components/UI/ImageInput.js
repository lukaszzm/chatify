import styles from "./ImageInput.module.css";
import { useRef, useState } from "react";
import ProfileImage from "./ProfileImage";
import Button from "./Button";
import Icon from "./Icon";
import editIcon from "../../assets/edit.svg";

const ImageInput = ({ name, onChange, defaultImage }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef();

  const clickHandler = () => {
    inputRef.current.click();
  };
  return (
    <div className={styles["input-container"]}>
      {selectedImage && (
        <ProfileImage
          localFile
          size="large"
          className={styles.preview}
          src={URL.createObjectURL(selectedImage)}
        />
      )}
      {defaultImage && !selectedImage && (
        <ProfileImage
          size="large"
          className={styles.preview}
          src={defaultImage}
        />
      )}
      <input
        type="file"
        name={name}
        accept="image/png, image/jpg, image/jpeg"
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
          onChange(event.target.files[0]);
        }}
        style={{ display: "none" }}
        ref={inputRef}
      />
      {selectedImage || defaultImage ? (
        <Button outline type="button" className={styles['edit-button']} onClick={clickHandler}>
          <Icon noColor icon={editIcon} className={styles.icon} />
        </Button>
      ) : (
        <Button
          outline
          type="button"
          onClick={clickHandler}
          className={styles.button}
        >
          Upload Profile Image
        </Button>
      )}
    </div>
  );
};

export default ImageInput;
