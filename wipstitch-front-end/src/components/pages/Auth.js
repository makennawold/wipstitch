import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export function Auth() {
  const { login } = useContext(UserContext);

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  return (
    <div className="auth">
      <div className="auth-wrapper">
        <div className="logo">wipstitch</div>
        <input
          type="text"
          placeholder="username"
          onChange={(event) => {
            setUsernameInput(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="password"
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
        <button className="sign-up-btn">sign up</button>
      </div>
    </div>
  );
}

export default Auth;
