import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { FaCheck, FaTimes, FaArrowLeft } from "react-icons/fa";

import { Link } from "react-router-dom";

export default function NewList() {
  const { editMode, setEditMode } = useContext(UserContext);

  const [publicStatus, setPublicStatus] = useState(true);

  const handleSubmit = () => {
    //post request
    //after post request has come back
    //getData on app needs to refresh
    //get the new lists id and set selected id to it
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
        <input label="title" />
      </div>
      <div className="list-items-input">
        items
        <input label="items" />
      </div>

      <div className="button-wrapper">
        <button
          className="submit-button"
          onClick={() => setEditMode("viewList")}
        >
          {" "}
          submit
        </button>

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
