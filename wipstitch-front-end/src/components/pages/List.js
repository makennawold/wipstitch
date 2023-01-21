import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import {
  FaCheck,
  FaEdit,
  FaTimes,
  FaPlusCircle,
  FaTrashAlt,
  FaArrowLeft,
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function List() {
  //viewList, editList, newList
  //mode is passed down with render and updated by buttons
  //view, edit, new
  //render based on mode
  //submit button submits the CRUD request, if it works send user back to Lists page

  const {
    user,
    listsData,
    setListsData,
    selectedItem,
    setSelectedItem,
    mode,
    setMode,
  } = useContext(UserContext);

  const [editMode, setEditMode] = useState("viewList");
  const [publicStatus, setPublicStatus] = useState(true);

  const title = listsData.filter((item) => item.id == selectedItem)[0]
    .list_name;

  const listItems = listsData.filter((item) => item.id == selectedItem)[0]
    .items;

  const createLists = () => {
    const listItems = listsData.filter((item) => item.id == selectedItem)[0]
      .items;
    const listItemsArray = listItems.split(", ");
    return listItemsArray.map((item) => {
      return <div key={item}>{item}</div>;
    });
  };

  return (
    <div className="list-wrapper">
      <div className="list-card">
        <Link to="/lists">
          <FaArrowLeft className="back-arrow" />
        </Link>
        <div className="title-wrapper">
          <div className="title">{title}</div>
          <div className="mode-buttons-wrapper">
            {editMode == "viewList" ? (
              <FaEdit onClick={() => setEditMode("editList")} />
            ) : (
              <FaCheck onClick={() => setEditMode("viewList")} />
            )}
            <FaTrashAlt />
          </div>
        </div>
        <div className="list-items-wrapper">{createLists()}</div>
        <div className="button-wrapper">
          <button className="submit-button"> submit</button>

          <div
            className={`toggle-button ${publicStatus ? "public" : "private"}`}
          >
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
    </div>
  );
}
