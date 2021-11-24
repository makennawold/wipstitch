import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { useState, createContext } from "react";

const UserContext = createContext({ username: "", auth: false });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "", auth: false });

  const login = (username) => {
    setUser((user) => ({
      username: username,
      auth: true,
    }));
  };

  const logout = () => {
    setUser((user) => ({
      username: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
