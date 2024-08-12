
import UpdateTodo from "./UpdateTodo";
import React from "react";
import { useForm } from "react-hook-form";

export default function GetSingleTodo({ todo, fetchTodos }) {
  const date = new Date(todo.createdAt);

  return (
    <div className="SingleTodo">
      <div key={todo.title}>
        <UpdateTodo
          id={todo._id}
          todo={todo}
          completed={todo.completed}
          fetchTodos={fetchTodos}
        />
      </div>

      {/* <div className="SingleTodo-date-delete">
        <button>{date.toDateString()}</button>
      </div> */}
    </div>
  );
}
