import React, { useState } from "react";
import ShowAlert from "../ShowAlert";
// import DeleteTodo from "../todo/DeleteTodo";
// import GetTodo from "../GetTodo";

const UpdateTodo = function ({ fetchTodoList, list }) {
   const [isSave, setIsSave] = useState(false);
   const [view, setView] = useState(false);
  const [message, setMessage] = React.useState("");
  const inputRef = React.useRef();
//   function handleDoneClick({ todoList }) {
//       fetch("http://localhost:3000/todo/", {
//         method: "PUT",
//         body: JSON.stringify({ todoList }),
//         headers: {
//           "Content-Type": "application/json",
//           token: localStorage.getItem("token"),
//         },
//       })
//         .then((response) => response.json())
//         .then((result) => {
//           fetchTodos();
//         });
//   }
  return (
     <div className="UpdateTodo" key="list._id">
        <a href="/">
      <input
        ref={inputRef}
        className="title"
        defaultValue={list.todoList}
      //   onFocus={() => setIsSave(true)}
      //   onBlur={() =>
      //     setTimeout(() => {
      //       setIsSave(false);
      //     }, 200)
           //   }
           onFocus={() => setView((prev) => !prev)}
         //   onBlur={()=>setView((prev) => !prev)}
           onClick={() => { localStorage.setItem('todoListId', list._id); fetchTodoList();}}
           />
           </a>
      {/* {isSave && (
        <button
          className="save-btn"
          onClick={() => {
            handleDoneClick({
              todoList: inputRef.current.value,
            });
          }}
        >
          Save
        </button>
        )} */}
        {/* <div style={{ display: view ? "inline" : "none" }}>
                <GetTodo todoListId={list._id} />
              </div> */}
      {/* <DeleteTodo id={todo._id} task={todo.task} fetchTodos={fetchTodos} /> */}
      <div>
        {message && <ShowAlert message={message} setMessage={setMessage} />}
      </div>
    </div>
  );
};
export default UpdateTodo;
