const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    name: String,
    message: String,
    time: String
})

module.exports = mongoose.model('message', messagesSchema);