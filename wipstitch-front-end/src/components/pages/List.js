import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import {
  FaCheck,
  FaEdit,
  FaTimes,
  FaPlusCircle,
  FaTrashAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function List() {
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
  //viewList, editList, newList
  //mode is passed down with render and updated by buttons
  //view, edit, new
  //render based on mode
  //submit button submits the CRUD request, if it works send user back to Lists page

  return (
    <div className="list-wrapper">
      <Link to="/lists" className="link">
        back
      </Link>
      <div className="title-wrapper">
        list title
        <div className="mode-buttons-wrapper">
          {editMode == "viewList" ? (
            <FaEdit onClick={() => setEditMode("editList")} />
          ) : (
            <FaCheck onClick={() => setEditMode("viewList")} />
          )}
          <FaTrashAlt />
        </div>
      </div>
      <div>items</div>
      <div className="button-wrapper">
        <div>submit button</div>
        <div>private slider</div>
      </div>

      <div>welcome to lists</div>
    </div>
  );
}
