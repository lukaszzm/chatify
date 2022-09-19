import styles from "./ProfileImage.module.css";

const ProfileImage = ({ src, className, size, localFile }) => {
  const classes =
    size === "large"
      ? `${styles["image-container"]} ${styles.large} ${className}`
      : `${styles["image-container"]} ${className}`;

  return (
    <div className={classes}>
      <img src={localFile ? `${src}` : `${process.env.REACT_APP_IMAGE_URL}${src}${process.env.REACT_APP_IMAGE_SUFFIX}`} alt="avatar" />
    </div>
  );
};

export default ProfileImage;
