import React, { memo, useState } from "react";
import ShowAlert from "./ShowAlert";
import Checkbox from "@mui/material/Checkbox";
import DeleteTodo from "./DeleteTodo";
import TextField from '@mui/material/TextField';

const UpdateTodo = function ({ id, completed, fetchTodos, todo }) {
  const [isSave, setIsSave] = useState(false);
  const [message, setMessage] = React.useState("");
  const inputRef = React.useRef();
  function handleDoneClick({ title, completed }) {
    fetch("http://localhost:3000/todo/", {
      method: "PUT",
      body: JSON.stringify({ id, completed, title }),
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        fetchTodos();
      //   setMessage(result.message);
      });
  }
  return (
    <div className="UpdateTodo">
      <Checkbox
        checked={completed}
        size="large"
        onClick={() => handleDoneClick({ completed: !completed })}
        color="secondary"
      />
      <input
        ref={inputRef}
        className="title"
        defaultValue={todo.title}
        onFocus={() => setIsSave(true)}
        onBlur={() =>
          setTimeout(() => {
            setIsSave(false);
          }, 200)
        }
      />
      {isSave && (
        <button
          className="save-btn"
          onClick={() => {
            handleDoneClick({
              title: inputRef.current.value,
            });
          }}
        >
          Save
        </button>
        )}
        <DeleteTodo id={todo._id} title={todo.title} fetchTodos={fetchTodos} />
      <div>
        {message && <ShowAlert message={message} setMessage={setMessage} />}
      </div>
    </div>
  );
};
export default UpdateTodo;
