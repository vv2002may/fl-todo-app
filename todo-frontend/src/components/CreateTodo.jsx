import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import ShowAlert from "./ShowAlert";
import React from "react";

export default function CreateTodo({ fetchTodos }) {
  const [message, setMessage] = React.useState("");
  const [body, setBody] = useState({
    title: "",
    // description: "",
  });
  function handleButtonClick() {
    fetch("http://localhost:3000/todo/", {
      method: "POST",
      body: JSON.stringify({
        title: body.title,
        // // description: body.description,
      }),
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token")
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setMessage(result.message);
        setBody((prev) => ({
          title: "",
          // description: "",
        }));
        fetchTodos();
      });
  }

  return (
    <div className="CreateTodo">
      <div>
        {message && <ShowAlert message={message} setMessage={setMessage} />}
      </div>
      <input
        value={body.title}
        onChange={(e) =>
          setBody((prev) => ({ ...prev, title: e.target.value }))
        }
        type="text"
        placeholder="Add a Task"
      />
      {/* <input
        // value={body.description}
        onChange={(e) =>
          // setBody((prev) => ({ ...prev, description: e.target.value }))
        }
        type="text"
        // placeholder="Description"
      /> */}
      <FaPlus className="FaPlus" onClick={handleButtonClick}>Add Task</FaPlus>
    </div>
  );
}
