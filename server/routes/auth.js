const {
  getUserById,
  getUserByName,
  updateFirstName,
  updateLastName,
  updatePassword,
  login,
  register
} = require("../controllers/userControllers");

const auth = require("../middleware/auth");
const router = require('express').Router();
const fileUpload = require("../middleware/uploadImage");

router.post("/login/", login)
router.post("/register/", fileUpload.single('profileImage'), register)


router.use(auth);
router.get("/user-by-id/:id", getUserById);
router.get("/user-by-name/:input", getUserByName);
router.patch("/update-first-name/:firstName", updateFirstName);
router.patch("/update-last-name/:lastName", updateLastName);
router.patch("/update-password/", updatePassword);



module.exports = router;