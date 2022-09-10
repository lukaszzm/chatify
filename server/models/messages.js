const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxLength: 250
    },
    fromId: {
        type: String,
        required: true
    },
    toId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
}, { collection: 'messages' });

const Messages = mongoose.model('Messages', messageSchema);

module.exports = Messages;
