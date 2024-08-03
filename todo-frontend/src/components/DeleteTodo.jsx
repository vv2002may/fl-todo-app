

export default function DeleteTodo({ id }) {
   
   function handleDeleteButton() {
      fetch('http://localhost:3000/todo/', {
         method: 'DELETE',
         body: JSON.stringify({id}),
         headers: {
            'Content-Type':'application/json'
         }
      })
         .then(response => response.json())
         .then((result) => (
            alert('Task Deleted!')
         ))
   }

   return (
      <button onClick={function () {
         handleDeleteButton()
      }}>Delete</button>
   )
}