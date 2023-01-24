import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { FaCheck, FaTimes, FaArrowLeft } from "react-icons/fa";

import { Link } from "react-router-dom";

export default function NewList() {
  const {
    editMode,
    setEditMode,
    user,
    listsData,
    getListsData,
    setSelectedItem,
  } = useContext(UserContext);

  const [publicStatus, setPublicStatus] = useState(true);
  const [title, setTitle] = useState("");
  const [items, setItems] = useState("");

  const createList = async (list_name, items, public_status) => {
    const username = user;
    const data = { username, list_name, items, public_status };

    await fetch(`http://localhost:5000/list`, {
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
    getListsData(user);
    setEditMode("viewList");
  };

  return (
    <div className="list-card">
      <div className="title-wrapper">
        <Link to="/lists" className="back-button">
          <FaArrowLeft /> back
        </Link>
      </div>
      <div className="title-input">
        title
        <input
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="list-items-input">
        items
        <input
          placeholder="separate your items by commas"
          value={items}
          onChange={(e) => setItems(e.target.value)}
        />
      </div>

      <div className="button-wrapper">
        <Link
          to="/lists"
          className="submit-button"
          onClick={() => createList(title, items, publicStatus)}
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
