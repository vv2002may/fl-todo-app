import { useState } from "react"

export default function CreateTodo() {
   const [body, setBody] = useState({
      title: "",
      description:""
   })
   function handleButtonClick() {
      fetch('http://localhost:3000/todo/', {
         method: 'POST',
         body: JSON.stringify(body),
         headers: {
            'Content-Type':'application/json'
         }
      })
         .then(response => response.json())
         .then((result) => {
            alert(result.message)
            setBody(prev => ({
               title: '',
               description:''
            }));
      })
   }

   return (
      <div
         style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '10px',
         }}
      >
         <input
            value={body.title}
            onChange={e=>setBody(prev=>({...prev,title:e.target.value}))}
            style={{ padding: "10px", margin: '5px' }}
            type="text"
            placeholder="Title" />
         <input
            value={body.description}
            onChange={e => setBody(prev=>({...prev,description:e.target.value}))}
            style={{ padding: "10px", margin: '5px' }}
            type="text" placeholder='Description' />
         <button
            onClick={handleButtonClick}
            style={{ padding: "10px", margin: '5px' }} >
            Add Task
         </button>
      </div>
   )
}