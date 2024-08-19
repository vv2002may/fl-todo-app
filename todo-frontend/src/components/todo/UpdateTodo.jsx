import React, { useState } from "react";
import ShowAlert from "../ShowAlert";
import DeleteTodo from "./DeleteTodo";

const UpdateTodo = function ({ fetchTodos, todo }) {
  const [isSave, setIsSave] = useState(false);
  const [message, setMessage] = React.useState("");
  const inputRef = React.useRef();
  function handleDoneClick({ task, completed }) {
      fetch("http://localhost:3000/todo/", {
        method: "PUT",
        body: JSON.stringify({ id: todo._id, completed, task }),
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((result) => {
          fetchTodos();
        });
  }
  return (
    <div className="UpdateTodo" key="todo.task">
      <input
        className="checkbox"
        type="checkbox"
        defaultChecked={todo.completed}
        size="large"
        onClick={() => handleDoneClick({ task: todo.task, completed: !todo.completed }) }
        color="secondary"
      />
      <input
        style={{
          textDecorationLine: todo.completed ? "line-through" : "none",
        }}
        ref={inputRef}
        className="title"
        defaultValue={todo.task}
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
              task: inputRef.current.value,
              completed: todo.completed,
            });
          }}
        >
          Save
        </button>
      )}
      <DeleteTodo id={todo._id} task={todo.task} fetchTodos={fetchTodos} />
      <div>
        {message && <ShowAlert message={message} setMessage={setMessage} />}
      </div>
    </div>
  );
};
export default UpdateTodo;
