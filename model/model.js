const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    password: String
})

module.exports = mongoose.model('User_info', UserSchema);