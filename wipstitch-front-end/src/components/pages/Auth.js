import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export function Auth() {
  const { login } = useContext(UserContext);

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  return (
    <div>
      <div>this is auth</div>
      <div>{usernameInput}</div>
      <input
        type="text"
        placeholder="username"
        onChange={(event) => {
          setUsernameInput(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="username"
        onChange={(event) => {
          setPasswordInput(event.target.value);
        }}
      />
      <button onClick={() => login(usernameInput, passwordInput)}></button>
    </div>
  );
}

export default Auth;
