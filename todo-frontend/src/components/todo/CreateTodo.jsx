import { useState } from "react";
import { MdDataSaverOn } from "react-icons/md";
import ShowAlert from "../ShowAlert";
import React from "react";

export default function CreateTodo({ fetchTodos, todoListId }) {
  const [message, setMessage] = React.useState("");
  const [task, setTask] = useState("");
  function handleButtonClick() {
    fetch("http://localhost:3000/todo/", {
      method: "POST",
      body: JSON.stringify({ task,todoListId }),
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setMessage(result.message);
        setTask("");
        fetchTodos();
      });
  }

  return (
    <div className="CreateTodo">
      <div>
        {message && <ShowAlert message={message} setMessage={setMessage} />}
      </div>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        type="text"
        placeholder="Add a Task"
      />
      <MdDataSaverOn className="add-btn" onClick={handleButtonClick}>
        Add Task
      </MdDataSaverOn>
    </div>
  );
}
