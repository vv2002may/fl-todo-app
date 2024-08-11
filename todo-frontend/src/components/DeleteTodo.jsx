import { MdDelete } from "react-icons/md";
import React from "react";
import ShowAlert from "./ShowAlert";

export default function DeleteTodo({ id, fetchTodos, title }) {
  const [message, setMessage] = React.useState("");
  function handleDeleteButton() {
    fetch("http://localhost:3000/todo/", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => (setMessage(result.message), fetchTodos()));
  }
  if (!title) {
    handleDeleteButton();
  }
  return (
    <div className="DeleteTodo">
      <MdDelete
        className="delete-btn"
        onClick={function () {
          handleDeleteButton();
        }}
      >
        Delete
      </MdDelete>
      <div>
        {message && <ShowAlert message={message} setMessage={setMessage} />}
      </div>
    </div>
  );
}
