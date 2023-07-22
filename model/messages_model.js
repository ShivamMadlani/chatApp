const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    name: String,
    message: String
})

module.exports = mongoose.model('message', messagesSchema);