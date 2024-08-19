const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
   task:String,
   // email: String,
   todoListId:String,
   completed: Boolean
},{timestamps:true})

const todo = mongoose.model('todos', todoSchema);
module.exports=({
   todo
})