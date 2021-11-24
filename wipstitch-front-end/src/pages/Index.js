import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export function Index() {
  const { user, login } = useContext(UserContext);

  const [usernameInput, setUsernameInput] = useState("");

  return (
    <div>
      <div>user = {user}</div>
      <div>this is index</div>
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

export default Index;

// {user.auth ? (
//   <Route path="/" exact component={Home}></Route>
// ) : (
//   <div>auth component</div>
// )}
