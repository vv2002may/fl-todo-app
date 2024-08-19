import { MdDelete } from "react-icons/md";
import React from "react";
import ShowAlert from "../ShowAlert";
import { useNavigate } from "react-router-dom";

export default function DeleteTodo({ id, fetchTodos, task }) {
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();
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
      .then((result) => {
        setMessage(result.message);
        navigate('/');
      });
  }
  if (!task) {
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
