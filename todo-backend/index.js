const express = require('express')
const mongoose = require('mongoose')
const zod = require('zod')
const cors = require('cors')
const { createTodo, updateTodo } = require('./models/todo')
const { todo } = require('./models/db')
const dotenv = require('dotenv')
dotenv.config();

mongoose.connect(process.env.mongoURL + 'tasks')
   .then(() => {
      console.log('DB is Connected!')
   })
const app = express()

app.use(cors())
app.use(express.json());

app.get('/todo', (req, res) => {
   todo.find().sort({ createdAt: -1 })
      .then((todos) => {
         res.json({
            todos
         })
      })
})

app.post('/todo', (req, res) => {
   let payloadData = createTodo.safeParse(req.body)
   if (payloadData.success) {
      todo.create({
         title: req.body.title,
         description: req.body.description,
         completed: false
      })
         .then((result) => {
            res.status(200).json({
               message: 'Task Added Successfully!'
            })
         })
   }
   else {
      res.status(411).json({
         message: 'Wrong inputs!'
      })
   }
})

app.put('/todo', (req, res) => {
   if (updateTodo.safeParse(req.body).success) {
      todo.updateOne({
         _id: req.body.id
      }, {
         completed: !req.body.completed
      })
         .then(() => {
            if (req.body.completed) {
               res.json({
                  message: "Marked as Uncompleted!"
               })
            }
            else {
               res.json({
                  message: "Marked as Completed!"
               })
            }
         })
         .catch((e) => res.json({
            message: 'Wrong ID!'
         }))
   }
   else {
      res.status(411).json({
         message: 'Wrong inputs!'
      })
   }
})

app.delete('/todo', (req, res) => {
   todo.deleteOne({
      _id: req.body.id
   })
      .then(() => {
         res.json({
            message: 'Task Deleted!'
         })
      })
})

app.listen(process.env.PORT, () => console.log('Server is Working!'));