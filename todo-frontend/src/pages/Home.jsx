import React, { useEffect, useState } from "react";
import GetTodo from "../components/todo/GetTodo";
import CreateTodoList from "../components/todolist/CreateTodoList";
import UpdateTodoList from "../components/todolist/UpdateTodoList";

export default function Home() {
  const [TodoList, setTodoList] = useState([]);
  const [view, setView] = useState(localStorage.getItem("todoListId"));
  const fetchTodoList = () => {
    fetch("http://localhost:3000/todoList", {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTodoList(data.todoList);
        } else {
          localStorage.clear();
          navigate("/signin");
        }
      });
  };

  useEffect(() => {
    fetchTodoList();
  }, [view]);

  return (
    <div className="Home">
      <div>
        <CreateTodoList fetchTodoList={fetchTodoList} />
        <div className="todoList">
        {TodoList.map((list, index) => {
          return (
            <div key={list._id} className="GetTodo">
              {/* <button onClick={() => setView((prev) => !prev)}>
                {list.todoList}
              </button> */}
              <UpdateTodoList fetchTodoList={fetchTodoList} list={list} />
              {/* <div style={{ display: view ? "inline" : "none" }}>
                <GetTodo todoListId={list._id} />
              </div> */}
            </div>
          );
        })}
        </div>
      </div>
      {/* <div style={{ display: view ? "inline" : "none" }}>
        <GetTodo todoListId={list._id} />
      </div> */}
      <div>
      {view && <GetTodo todoListId={view} />}
      </div>
    </div>
  );
}
