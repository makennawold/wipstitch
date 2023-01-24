import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export function Auth() {
  const { login } = useContext(UserContext);

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [newUsernameInput, setNewUsernameInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [authMode, setAuthMode] = useState("login");

  const createUser = async (username, password) => {
    const data = { username, password };
    console.log(JSON.stringify(data));

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
    <div className="auth">
      {authMode == "login" ? (
        <div className="auth-wrapper">
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
          <button
            className="login-btn"
            onClick={() => login(usernameInput, passwordInput)}
          >
            login
          </button>
          <div className="divider">
            <div className="line"></div>
            or
            <div className="line"></div>
          </div>
          <button className="sign-up-btn" onClick={() => setAuthMode("signup")}>
            sign up
          </button>
        </div>
      ) : (
        <div className="auth-wrapper">
          <div className="logo">wipstitch</div>
          <input
            type="text"
            placeholder="username"
            value={newUsernameInput}
            onChange={(event) => {
              setNewUsernameInput(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="password"
            value={newPasswordInput}
            onChange={(event) => {
              setNewPasswordInput(event.target.value);
            }}
          />
          <button
            className="sign-up-btn"
            onClick={() => createUser(newUsernameInput, newPasswordInput)}
          >
            sign up
          </button>
        </div>
      )}
    </div>
  );
}

export default Auth;
