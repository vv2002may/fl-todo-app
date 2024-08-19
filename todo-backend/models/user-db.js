const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name: String,
   email: String,
   password: String,
}, { timestamps: true })

const users = mongoose.model('users', userSchema);
module.exports = {
   users
}