import styles from "./ProfileImage.module.css";

const ProfileImage = ({ src, className }) => {
  const classes = `${styles["image-container"]} ${className}`;
  return (
    <div className={classes}>
      <img src={src} alt="Profile" />
    </div>
  );
};

export default ProfileImage;
