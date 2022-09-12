const {
  getUserById,
  getUserByName,
  updateFirstName,
  updateLastName,
  login,
  register
} = require("../controllers/userControllers");

const auth = require("../middleware/auth");
const router = require('express').Router();

router.post("/login/", login)
router.post("/register/", register)


router.use(auth);
router.get("/user-by-id/:id", getUserById);
router.get("/user-by-name/:input", getUserByName);
router.post("/update-first-name/:firstName", updateFirstName);
router.post("/update-last-name/:lastName", updateLastName);



module.exports = router;