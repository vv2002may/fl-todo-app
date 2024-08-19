const express = require('express')
const mongoose = require('mongoose')
const zod = require('zod')
const jwt = require('jsonwebtoken') 
const cors = require('cors')
const { createTodo, updateTodo } = require('./models/todos-zod')
const { todo } = require('./models/todos-db')
const { users } = require('./models/user-db')
const {todoList} =require('./models/todo-list-db')
const dotenv = require('dotenv')
dotenv.config();
const { userMiddleware } = require('./middleware/userMiddleware')


mongoose.connect(process.env.mongoURL + 'tasks')
   .then(() => {
      console.log('DB is Connected!')
   })
const app = express()

app.use(cors())
app.use(express.json());

app.get('/todoList', userMiddleware, (req, res) => {
   todoList.find({ email: req.headers.email }).sort({
      completed: 1,
      updatedAt: -1,
      createdAt: -1
   })
      .then((todoList) => {
         res.json({
            success: true,
            todoList
         })
      })
})

app.get('/todo', userMiddleware, (req, res) => {

   todo.find({ todoListId: req.headers.todolistid }).sort({
      completed: 1,
      updatedAt: -1,
      createdAt: -1
   })
      .then((todos) => {
         res.json({
            success: true,
            todos
         })
      })
})

app.post('/todoList', userMiddleware, (req, res) => {
   const schema = zod.object({
      todoList: zod.string(),
      // email:zod.string().email()
   })
   let payloadData = schema.safeParse(req.body)
   if (payloadData.success) {
      todoList.create({
         todoList: req.body.todoList,
         email: req.headers.email,
         // email:req.body.email,
      })
         .then((result) => {
            console.log(result)
            res.status(200).json({
               success: true,
               message: 'Task List Added Successfully!',
               data:result
            })
         })
   }
   else {
      res.status(411).json({
         message: 'Wrong inputs!'
      })
   }
})

app.post('/todo', userMiddleware, (req, res) => {
   console.log(req.body)
   let payloadData = createTodo.safeParse(req.body)
   if (payloadData.success) {
      todo.create({
         task: req.body.task,
         todoListId: req.body.todoListId,
         completed: false
      })
         .then((result) => {
            console.log(result)
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

app.put('/todo', userMiddleware, (req, res) => {
   console.log(req.body)
   if (updateTodo.safeParse(req.body).success) {
      todo.updateOne({
         _id: req.body.id
      }, {
         completed: req.body.completed,
         task: req.body.task
      })
         .then(() => {
            if (req.body.completed) {
               res.json({
                  message: "Status Updated!"
               })
            }
            else {
               res.json({
                  message: "Status Updated!"
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

app.delete('/todo', userMiddleware, (req, res) => {
   todo.deleteOne({
      _id: req.body.id
   })
      .then(() => {
         res.json({
            message: 'Task Deleted!'
         })
      })
})

app.post('/signin', (req, res) => {
   try {
      const schema = zod.object({
         email: zod.string().email(),
         password: zod.string().min(1)
      })
      let payloadData = schema.safeParse(req.body);
      if (payloadData.success) {
         users.findOne({ email: req.body.email })
            .then(data => {
               if (data) {
                  users.findOne(req.body)
                     .then((data) => {
                        if (data) {
                           const token = jwt.sign({ email: req.body.email }, process.env.jwtSecret);
                           res.json({
                              success: true,
                              token: token,
                              name: data.name,
                              email: data.email,
                              message: 'You have signed in successfully!'
                           })
                        }
                        else {
                           res.json({
                              success: false,
                              message: 'Incorrect Password!'
                           })
                        }
                     })
               }
               else {
                  res.json({
                     success: false,
                     message: 'User does not exits!',
                  })
               }
            })
      }
      else {
         res.json({
            success: false,
            message: 'Wrong Inputs!'
         })
      }
   }
   catch (err) {
      res.json({
         message: err
      })
   }
})

app.post('/signup', (req, res) => {
   let schema = zod.object({
      name: zod.string(),
      email: zod.string().email(),
      password: zod.string().min(1)
   })
   let payloadData = schema.safeParse(req.body)
   if (payloadData.success) {
      users.findOne({ email: req.body.email })
         .then(data => {
            if (data) {
               res.json({
                  success: false,
                  message: 'User already exits!'
               })
            }
            else {
               users.create(req.body)
                  .then(data => {
                     const token = jwt.sign({ email: req.body.email }, process.env.jwtSecret);
                     res.status(200).json({
                        success: true,
                        token: token,
                        name: data.name,
                        message: 'User Created!'
                     })
                  })
            }
         })
   }
   else {
      res.json({
         success: false,
         message: 'Wrong Inputs!'
      })
   }
})

app.listen(process.env.PORT, () => console.log('Server is Working!'));