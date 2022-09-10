const {
  sendMessage,
  getMessages,
  getRecentMessages,
} = require("../controllers/messageControllers");

const router = require("express").Router();
const auth = require("../middleware/auth");

router.use(auth);
router.post("/send-message/", sendMessage);
router.get("/get-messages/:id", getMessages);
router.get("/get-recent-messages/", getRecentMessages);

module.exports = router;
