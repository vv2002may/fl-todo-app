import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowAlert from "../components/ShowAlert";

export default function Signin() {
  const [message, setMessage] = React.useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function handleSignin() {
    fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.name);
          localStorage.setItem('email',data.email)
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      });
  }

  return (
    <div className="signin">
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
      <button onClick={handleSignin}>Signin</button>

      <div>
        {message && <ShowAlert message={message} setMessage={setMessage} />}
      </div>
    </div>
  );
}
