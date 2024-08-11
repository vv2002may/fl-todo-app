const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
   title:String,
   description: String,
   email: String,
   completed: Boolean
},{timestamps:true})

const todo = mongoose.model('todos', todoSchema);
module.exports=({
   todo
})