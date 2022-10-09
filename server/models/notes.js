const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLenght: 50
    },
    text: {
        type: String,
        required: true,
        maxLength: 1000
    },
    fromId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
}, { collection: 'notes' });

const Notes = mongoose.model('Notes', noteSchema);

module.exports = Notes;