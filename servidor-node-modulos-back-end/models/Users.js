const mongoose = require('mongoose');

let usersSchema = new mongoose.Schema({
    username: String,
    password: String
});

let Users = new mongoose.model('User',usersSchema);

module.exports = Users;