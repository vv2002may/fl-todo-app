import { useEffect, useState } from 'react'
import './App.css'
import CreateTodo from './components/CreateTodo'
import GetTodo from './components/GetTodo'

function App() {

  const [todos, setTodos] = useState([])
  useEffect(()=>{
    fetch('http://localhost:3000/todo/')
    .then(response => response.json())
    .then(data => setTodos(data.todos))
  },[todos])
  return (
    <div className='App'>
      <CreateTodo />
      <GetTodo todos={todos} />
    </div>
  )
}

export default App
