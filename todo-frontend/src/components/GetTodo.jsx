import { useNavigate } from "react-router-dom";
import CreateTodo from "./CreateTodo";
import React, { useEffect, useState } from "react";
import GetSingleTodo from "./GetSingleTodo";

export default function GetTodo() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const fetchTodos = () => {
    fetch("http://localhost:3000/todo/", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setTodos(data.todos);
        } else {
          navigate("/signin");
        }
      });
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div className="GetTodo">
      <CreateTodo fetchTodos={fetchTodos} />
      <div>
        {todos.map(function (todo, index) {
          return (
            <GetSingleTodo  key={index} fetchTodos={fetchTodos} todo={todo} index={index} />
          )
        })}
      </div>
    </div>
  );
}
