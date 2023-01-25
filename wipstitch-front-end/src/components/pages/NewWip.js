import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { FaCheck, FaTimes, FaArrowLeft } from "react-icons/fa";

import { Link } from "react-router-dom";

export default function NewWip() {
  const {
    wipsData,
    getWipsData,
    user,
    selectedWip,
    setSelectedWip,
    getWipTasks,
    wipTasks,
    editWipMode,
    setEditWipMode,
  } = useContext(UserContext);

  const [public, setPublic] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [name, setName] = useState("");

  const createWip = async (task_name, completed, public) => {
    const username = user;
    const data = { username, task_name, completed, public };

    await fetch(`http://localhost:5000/wip`, {
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
    getWipsData(user);
    setEditWipMode("viewWip");
  };

  return (
    <div className="wip-card">
      <div className="title-wrapper">
        <Link to="/wips" className="back-button">
          <FaArrowLeft /> back
        </Link>
      </div>
      <div className="name-input">
        wips name
        <input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="button-wrapper">
        <Link
          to="/wips"
          className="submit-button"
          onClick={() => createWip(name, completed, publicStatus)}
        >
          submit
        </Link>

        <div className={`toggle-button ${public ? "public" : "private"}`}>
          <div className={`toggle-label ${public ? "public" : "private"}`}>
            {publicStatus ? "public" : "private"}
          </div>
          <div
            className={`toggle ${public ? "public" : "private"}`}
            onClick={() => {
              setPublic(!public);
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
