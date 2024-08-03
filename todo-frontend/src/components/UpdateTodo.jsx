

export default function UpdateTodo({ id, completed }) {

   function handleDoneClick() {
      fetch('http://localhost:3000/todo/', {
         method: 'PUT',
         body: JSON.stringify({ id, completed }),
         headers: {
            'Content-Type': 'application/json'
         }
      })
         .then(response => response.json())
         .then(result => alert(result.message))
   }

   return (
      <button
         onClick={() => handleDoneClick()}
      >
         {completed ? 'Done' : 'Mark As Done'}
      </button>
   )
}