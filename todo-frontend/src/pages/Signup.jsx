import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowAlert from "../components/ShowAlert";

export default function Signup() {
  const [message, setMessage] = React.useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function handleSignup() {
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.name);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      });
  }

  return (
    <div className="signin">
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="name"
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
      />
      <button onClick={handleSignup}>Signup</button>

      <div>
        {message && <ShowAlert message={message} setMessage={setMessage} />}
      </div>
    </div>
  );
}
