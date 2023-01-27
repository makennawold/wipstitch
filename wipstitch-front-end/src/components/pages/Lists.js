import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

import { FaPlus } from "react-icons/fa";

export default function Lists() {
  const {
    listsData,
    selectedItem,
    mode,
    changeSelectedItem,
    setEditMode,
  } = useContext(UserContext);

  //have contingency for when there aren't any lists "you have no lists please make some etc"

  const handleClick = (item) => {
    changeSelectedItem(item);
    setEditMode("viewList");
  };

  const createLists = () => {
    return listsData.map((item) => {
      return (
        <Link
          to="/list"
          key={item.id}
          className={`list ${item.id === selectedItem ? "selected" : ""}`}
          onClick={() => handleClick(item)}
        >
          {mode === "lists" ? item.list_name : item.wip_name}
        </Link>
      );
    });
  };

  return (
    <div className="lists-page">
      <div className="lists-wrapper">
        <div className="title-card">
          <div className="page-title">my lists</div>
          <Link
            to="/list"
            className="new-list-button"
            onClick={() => setEditMode("newList")}
          >
            <FaPlus /> new list
          </Link>
        </div>
        {listsData.length == 0 ? (
          <div>try creating some lists!</div>
        ) : (
          <div className="lists-grid">{createLists()}</div>
        )}
      </div>
    </div>
  );
}
