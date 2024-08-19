const zod = require('zod');

const createTodo = zod.object({
   task: zod.string().min(1),
   todoListId:zod.string()
})

const updateTodo = zod.object({
   id:zod.string()
})

module.exports = {
   createTodo,
   updateTodo
}