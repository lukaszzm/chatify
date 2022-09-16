import styles from "./ProfileImage.module.css";

const ProfileImage = ({ src, className, size }) => {
  const classes =
    size === "large"
      ? `${styles["image-container"]} ${styles.large} ${className}`
      : `${styles["image-container"]} ${className}`;
      
  return (
    <div className={classes}>
      <img src={`${process.env.REACT_APP_URL}${src}`} alt="Profile" />
    </div>
  );
};

export default ProfileImage;
