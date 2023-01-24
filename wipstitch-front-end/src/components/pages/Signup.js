import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export function Signup() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleSignUp = () => {
    const username = usernameInput;
    const password = passwordInput;
    createUser(username, password);
  };

  const createUser = async (username, password) => {
    const data = { username, password };

    await fetch(`http://localhost:5000/user`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "cors",
      },
      body: JSON.stringify(data),
    })
      .then((response) =>
        response.json().then((responseData) => {
          console.log(responseData);
        })
      )
      .catch((error) => {
        console.log("error is:", error);
      });
  };

  return (
    <div className="signup">
      <div className="auth-wrapper">
        {" "}
        <div className="logo">wipstitch</div>
        <input
          type="text"
          placeholder="username"
          value={usernameInput}
          onChange={(event) => {
            setUsernameInput(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="password"
          value={passwordInput}
          onChange={(event) => {
            setPasswordInput(event.target.value);
          }}
        />
        <button className="sign-up-btn" onClick={() => handleSignUp()}>
          sign up
        </button>
      </div>
    </div>
  );
}

export default Signup;
