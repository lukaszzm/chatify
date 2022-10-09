const {
    addNote,
    deleteNote,
    getAllNotes,
    getNote
  } = require("../controllers/notesControllers");
  
  const router = require("express").Router();
  const auth = require("../middleware/auth");
  
  router.use(auth);
  router.post("/add-note/", addNote);
  router.delete("/delete-note/:id", deleteNote);
  router.get("/get-all-notes/", getAllNotes);
  router.get("/get-note/:id", getNote)
  
  module.exports = router;
  