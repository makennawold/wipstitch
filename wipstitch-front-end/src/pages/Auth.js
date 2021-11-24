import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export function Auth() {
  const { user, login } = useContext(UserContext);

  const [usernameInput, setUsernameInput] = useState("");

  return (
    <div>
      <div>user = {user}</div>
      <div>this is auth</div>
      <div>{usernameInput}</div>
      <input
        type="text"
        placeholder="username"
        onChange={(event) => {
          setUsernameInput(event.target.value);
        }}
      />
      <button onClick={() => login(usernameInput)}></button>
    </div>
  );
}

export default Auth;
