const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    googleId: String
})

module.exports = mongoose.model('User_info', UserSchema);