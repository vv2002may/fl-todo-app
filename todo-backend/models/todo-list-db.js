const mongoose = require('mongoose');

const todoListSchema = new mongoose.Schema({
   email: String,
   todoList: String,
}, { timestamps: true });

const todoList = mongoose.model('todoList', todoListSchema);

module.exports=({todoList})