const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    message: String
})

module.exports = mongoose.model('Messages', schema);