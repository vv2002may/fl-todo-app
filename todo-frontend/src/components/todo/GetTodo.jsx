import { useNavigate } from "react-router-dom";
import CreateTodo from "./CreateTodo";
import React, { useEffect, useState } from "react";
import UpdateTodo from "./UpdateTodo";

export default function GetTodo({ todoList, todoListId }) {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  // console.log("getTodo", todoListId);
  const fetchTodos = () => {
    fetch("http://localhost:3000/todo/", {
      headers: {
        todolistid: todoListId,
        token: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setTodos(data.todos);
        } else {
          localStorage.clear();
          navigate("/signin");
        }
      });
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div>
      <CreateTodo fetchTodos={fetchTodos} todoListId={todoListId} />
      {todos.map(function (todo, index) {
        return (
          <UpdateTodo Todo key={todo._id} todo={todo} fetchTodos={fetchTodos} />
        );
      })}
    </div>
  );
}
