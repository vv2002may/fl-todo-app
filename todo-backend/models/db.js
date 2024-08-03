const mongoose = require('mongoose')
const { boolean } = require('zod')

const todoSchema = mongoose.Schema({
   title: String,
   description: String,
   completed:Boolean
},{timestamps:true})

const todo = mongoose.model('task-list', todoSchema);
module.exports=({
   todo
})