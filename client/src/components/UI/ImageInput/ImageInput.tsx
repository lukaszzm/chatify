import styles from "./ImageInput.module.css";
import { useRef, useState } from "react";
import editIcon from "../../../assets/icons/edit.svg";
import { Button, Icon, ProfileImage } from "..";

interface ImageInputProps {
  name: string;
  onChange: (image: File) => void;
  defaultImage?: string;
}

export const ImageInput: React.FC<ImageInputProps> = ({
  name,
  onChange,
  defaultImage,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const clickHandler = () => {
    inputRef!.current!.click();
  };

  return (
    <div className={styles["input-container"]}>
      {selectedImage && (
        <ProfileImage
          localFile
          large
          className={styles.preview}
          src={URL.createObjectURL(selectedImage)}
        />
      )}
      {defaultImage && !selectedImage && (
        <ProfileImage large className={styles.preview} src={defaultImage} />
      )}
      <input
        type="file"
        name={name}
        accept="image/png, image/jpg, image/jpeg"
        onChange={(event) => {
          if (event.target.files) {
            setSelectedImage(event.target.files[0]);
            onChange(event.target.files[0]);
          }
        }}
        style={{ display: "none" }}
        ref={inputRef}
      />
      {selectedImage || defaultImage ? (
        <Button
          outline
          type="button"
          className={styles["edit-button"]}
          onClick={clickHandler}
        >
          <Icon noColor icon={editIcon} className={styles.icon} alt="" />
        </Button>
      ) : (
        <Button outline type="button" onClick={clickHandler}>
          Upload Profile Image
        </Button>
      )}
    </div>
  );
};
