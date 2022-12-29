import clsx from "clsx";
import styles from "./ProfileImage.module.css";

interface ProfileImageProps {
  src: string;
  className?: string;
  large?: boolean;
  localFile?: boolean;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  className,
  large,
  localFile,
}) => {
  return (
    <div
      className={clsx(
        `${styles["image-container"]}`,
        `${className}`,
        large && `${styles.large}`
      )}
    >
      <img
        src={
          localFile
            ? `${src}`
            : `${process.env.REACT_APP_IMAGE_URL}${src}${process.env.REACT_APP_IMAGE_SUFFIX}`
        }
        alt="avatar"
      />
    </div>
  );
};
