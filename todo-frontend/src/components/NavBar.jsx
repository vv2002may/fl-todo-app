import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowAlert from "./ShowAlert";
export default function NavBar() {
  const user = localStorage.getItem("user");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  return (
    <nav className="navBar">
      {user && <button onClick={() => navigate("/")}>Home</button>}
      {!user && (
        <button
          onClick={() => {
            navigate("/signin");
            setMessage("Please, Sign In!");
          }}
        >
          Home
        </button>
      )}
        {message && <ShowAlert message={message} setMessage={ setMessage} />}
      <div>
        {!user && <button onClick={() => navigate("/signin")}>Sign In</button>}
        {user && <button onClick={() => navigate("/")}>{user}</button>}
        {!user && <button onClick={() => navigate("/signup")}>Sign Up</button>}
        {user && (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              localStorage.removeItem("email");
              navigate("/signin");
            }}
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
}
