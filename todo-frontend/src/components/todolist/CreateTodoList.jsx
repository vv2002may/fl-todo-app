import { useState } from "react";
import { MdDataSaverOn } from "react-icons/md";
import ShowAlert from "../ShowAlert";
import React from "react";

export default function CreateTodoList({ fetchTodoList }) {

  const [message, setMessage] = React.useState("");
   const [todoList, setTodoList] = useState("");
   
  function handleButtonClick() {
    fetch("http://localhost:3000/todoList/", {
      method: "POST",
      body: JSON.stringify({ todoList }),
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
       .then((result) => {
         // localStorage.setItem('todoListId',result.data._id)
        setMessage(result.message);
        setTodoList("");
        fetchTodoList();
      });
  }

  return (
    <div className="CreateTodo">
      <div>
        {message && <ShowAlert message={message} setMessage={setMessage} />}
      </div>
      <input
        value={todoList}
        onChange={(e) => setTodoList(e.target.value)}
        type="text"
        placeholder="Add a Task List"
      />
      <MdDataSaverOn className="add-btn" onClick={handleButtonClick}/>
    </div>
  );
}
