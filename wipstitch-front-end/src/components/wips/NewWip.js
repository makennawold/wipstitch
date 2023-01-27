import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { FaArrowLeft } from "react-icons/fa";

import { Link } from "react-router-dom";

export default function NewWip() {
  const { getWipsData, user, setEditWipMode, databaseURL } = useContext(
    UserContext
  );

  const [publicStatus, setPublicStatus] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [name, setName] = useState("");

  const createWip = async (wip_name, completed, public_status) => {
    const username = user;
    const data = { username, wip_name, completed, public_status };

    await fetch(`${databaseURL}wip`, {
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

        <div className={`toggle-button ${publicStatus ? "public" : "private"}`}>
          <div
            className={`toggle-label ${publicStatus ? "public" : "private"}`}
          >
            {publicStatus ? "public" : "private"}
          </div>
          <div
            className={`toggle ${publicStatus ? "public" : "private"}`}
            onClick={() => {
              setPublicStatus(!publicStatus);
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
