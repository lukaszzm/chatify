const Notes = require("../models/notes");

module.exports.getAllNotes = async (req, res, next) => {
    const { id } = req.body;
    
    try {
        const notes = await Notes.find({ fromId: id }, {title: 1, createdAt: 1}).sort({ createdAt: -1 });
        res.json(notes);
    } catch (err) {
        next(err);
    }
};

module.exports.getNote = async (req, res, next) => {
    const { id } = req.params; 
    try {
        const note = await Notes.findById(id);
        res.send(note);
    } catch(err) {
        next(err);
    }
}

module.exports.addNote = async (req, res, next) => {
    const { id, title, text, createdAt } = req.body;
    
    try {
        const newNote = new Notes({
            fromId: id,
            title: title,
            text: text,
            createdAt: createdAt,
          });
        newNote.save();
        res.send(newNote);
    } catch (err) {
        next(err);
    }
};

module.exports.deleteNote = async (req, res, next) => {
    const userId = req.body.id;
    const noteId = req.params.id;
    
    try {
      const note = await Notes.findById(noteId);
      if (!note) throw new Error("This note does not exist!")
      if (note.fromId !== userId) throw new Error("This note does not belong to this user!");
      note.remove()
      res.send("Success!")
    } catch (err) {
        next(err);
    }
}