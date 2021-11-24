import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

export function Auth() {
  const { user, setUser } = useContext(UserContext);

  return <div>this is auth</div>;
}

export default Auth;
