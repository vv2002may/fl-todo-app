import DeleteTodo from "./DeleteTodo"
import UpdateTodo from "./UpdateTodo"

export default function GetTodo({ todos }) {


   return (
      <div
         style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '10px',
         }}
      >
         {
            todos.map(function (todo, index) {
               return (
                  <div key={index}>
                     <h4>{todo.title}</h4>
                     <p>{todo.description}</p>
                     <UpdateTodo id={todo._id} completed={todo.completed} />
                     <DeleteTodo id={todo._id} />
                  </div>
               )
            })

         }
      </div>
   )
}