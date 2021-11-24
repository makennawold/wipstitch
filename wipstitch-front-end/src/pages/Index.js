import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export function Index() {
  const { user, login } = useContext(UserContext);

  return (
    <div>
      <div>user = {user}</div>
      <div>this is index</div>
    </div>
  );
}

export default Index;

// {user.auth ? (
//   <Route path="/" exact component={Home}></Route>
// ) : (
//   <div>auth component</div>
// )}
